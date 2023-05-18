export interface ReportResponse {
    user:   User;
    report: Report;
}

export interface Report {
    comment:     string;
    dateCreated: Date;
}

export interface User {
    token:      string;
    username:   string;
    imgProfile: string;
    biography:  string;
}
