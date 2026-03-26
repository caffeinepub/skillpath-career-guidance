import Map "mo:core/Map";
import Array "mo:core/Array";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Custom types
  type CourseCategory = { #technology; #business; #design; #data; #cybersecurity };

  type LearningResource = {
    courseName : Text;
    provider : Text;
    url : Text;
    estimatedHours : Nat;
  };

  type Job = {
    title : Text;
    company : Text;
    description : Text;
    requiredSkills : [Text];
    category : CourseCategory;
  };

  type StudentProfile = {
    name : Text;
    skills : [Text];
  };

  public type UserProfile = {
    name : Text;
  };

  type StudentJobMatch = {
    job : Job;
    matchPercent : Nat;
    missingSkills : [Text];
    missingResources : [LearningResource];
  };

  module StudentJobMatch {
    public func compare(std1 : StudentJobMatch, std2 : StudentJobMatch) : Order.Order {
      Nat.compare(std2.matchPercent, std1.matchPercent);
    };
  };

  // State variables and modules
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let jobToResources = Map.empty<Text, [LearningResource]>();
  let students = Map.empty<Principal, StudentProfile>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Helper functions
  func getAllJobs() : [Job] {
    jobToResources.keys().toArray().map(
      func(title) {
        switch (jobToResources.get(title)) {
          case (?resources) {
            switch (resources.size()) {
              case (0) {
                Runtime.trap("Job not found in resources array");
              };
              case (size) {
                {
                  title;
                  company = "TBD";
                  description = "";
                  requiredSkills = [];
                  category = #technology;
                };
              };
            };
          };
          case (null) { Runtime.trap("Job not found in resources map") };
        };
      }
    );
  };

  func getStudent(caller : Principal) : StudentProfile {
    switch (students.get(caller)) {
      case (null) { Runtime.trap("Student does not exist") };
      case (?student) { student };
    };
  };

  func hasSkill(requiredSkill : Text, studentSkills : [Text]) : Bool {
    for (studentSkill in studentSkills.values()) {
      if (studentSkill == requiredSkill) {
        return true;
      };
    };
    false;
  };

  func getMissingSkills(requiredSkills : [Text], studentSkills : [Text]) : [Text] {
    let missingSkills = List.empty<Text>();
    for (requiredSkill in requiredSkills.values()) {
      if (not hasSkill(requiredSkill, studentSkills)) {
        missingSkills.add(requiredSkill);
      };
    };
    missingSkills.toArray();
  };

  func calculateMatchingPercent(requiredSkills : [Text], studentSkills : [Text]) : Nat {
    var matchedCount = 0;
    for (requiredSkill in requiredSkills.values()) {
      if (hasSkill(requiredSkill, studentSkills)) {
        matchedCount += 1;
      };
    };
    if (requiredSkills.size() == 0) {
      0;
    } else {
      ((matchedCount * 100) : Int / requiredSkills.size()).toNat();
    };
  };

  // Required UserProfile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Manager functions (add jobs/resources) - Admin only
  public shared ({ caller }) func saveJob(job : Job) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add jobs");
    };
    if (jobToResources.containsKey(job.title)) {
      Runtime.trap("Job already exists");
    };
    jobToResources.add(job.title, []);
  };

  // Student functions (add/update own profile) - User only
  public shared ({ caller }) func saveProfile(profile : StudentProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    students.add(caller, profile);
  };

  public query ({ caller }) func getStudentSkills() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view student skills");
    };
    switch (students.get(caller)) {
      case (null) { Runtime.trap("Student does not exist") };
      case (?student) { student.skills };
    };
  };

  public query ({ caller }) func getStudentProfile() : async StudentProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view student profiles");
    };
    switch (students.get(caller)) {
      case (null) { Runtime.trap("Student does not exist") };
      case (?profile) { profile };
    };
  };

  // Public information endpoint - no auth required
  public query ({ caller }) func getInfo() : async Text {
    "This is the backend for IC SkillPath. It stores courses, skills and the share code.";
  };

  // Main logic - User only
  public shared ({ caller }) func getJobMatchingPercent(title : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get job matching");
    };
    let requiredSkills = switch (jobToResources.get(title)) {
      case (?resources) {
        switch (resources.size()) {
          case (0) { [] };
          case (_) { switch (students.get(caller)) { case (?student) { student.skills }; case (_) { [] } } };
        };
      };
      case (_) { [] };
    };
    calculateMatchingPercent(requiredSkills, switch (students.get(caller)) { case (?student) { student.skills }; case (_) { [] } });
  };

  func categorizeJobsByPercent(caller : Principal, studentSkills : [Text]) : [StudentJobMatch] {
    jobToResources.keys().toArray().map(
      func(title) {
        switch (students.get(caller)) {
          case (null) { Runtime.trap("Student does not exist") };
          case (?student) {
            {
              job = {
                title;
                company = "";
                description = "";
                requiredSkills = [];
                category = #technology;
              };
              matchPercent = calculateMatchingPercent([], studentSkills);
              missingSkills = getMissingSkills([], studentSkills);
              missingResources = [];
            };
          };
        };
      }
    ).sort();
  };

  public shared ({ caller }) func getJobsByPercent() : async [StudentJobMatch] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get jobs by percent");
    };
    switch (students.get(caller)) {
      case (null) { Runtime.trap("Student does not exist") };
      case (?student) {
        categorizeJobsByPercent(caller, student.skills).map(
          func(job) {
            {
              job = {
                title = job.job.title;
                company = "";
                description = "";
                requiredSkills = [];
                category = #technology;
              };
              matchPercent = calculateMatchingPercent([], student.skills);
              missingSkills = getMissingSkills([], student.skills);
              missingResources = [];
            };
          }
        );
      };
    };
  };
};
