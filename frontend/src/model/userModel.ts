export type UserType = {
    id: number,
    name: string,
    strava_id: number,
    accessToken: string | null,
    refreshToken: string | null,
    TokenExpiresAt: Date | null,
    created_at: Date | null,
    updated_at: Date | null,
    deleted_at: Date | null,
}

// export type UserType = {
//     id: number,
//     name: string,
//     strava_id: number,
// }