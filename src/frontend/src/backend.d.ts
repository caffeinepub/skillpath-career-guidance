import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StudentProfile {
    name: string;
    skills: Array<string>;
}
export interface Job {
    title: string;
    description: string;
    company: string;
    category: CourseCategory;
    requiredSkills: Array<string>;
}
export interface StudentJobMatch {
    job: Job;
    matchPercent: bigint;
    missingResources: Array<LearningResource>;
    missingSkills: Array<string>;
}
export interface UserProfile {
    name: string;
}
export interface LearningResource {
    url: string;
    provider: string;
    estimatedHours: bigint;
    courseName: string;
}
export enum CourseCategory {
    data = "data",
    design = "design",
    cybersecurity = "cybersecurity",
    technology = "technology",
    business = "business"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getInfo(): Promise<string>;
    getJobMatchingPercent(title: string): Promise<bigint>;
    getJobsByPercent(): Promise<Array<StudentJobMatch>>;
    getStudentProfile(): Promise<StudentProfile>;
    getStudentSkills(): Promise<Array<string>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveJob(job: Job): Promise<void>;
    saveProfile(profile: StudentProfile): Promise<void>;
}
