//"idle" | "pending" | "succeeded" | "failed"
export enum loadingStatePost {
  "IDLE" = "idle",
  "PENDING" = "pending",
  "SUCCEEDED" = "succeeded",
  "SUCCEEDEDCREATED" = "succeededCreated",
  "SUCCEEDEDUPDATED" = "succeededUpdated",
  "SUCCEEDEDDELETED" = "succeededDeleted",
  "SUCCEEDEDLIKED" = "succeededLiked",
  "FAILED" = "failed",
}

export enum loadingStateUser {
  "IDLE" = "idle",
  "PENDING" = "pending",
  "SUCCEEDED" = "succeeded",
  "SUCCEEDEDLOGOUT" = "succeededLogout",
  "FAILED" = "failed",
}

export enum loadingStateProfile {
  "IDLE" = "idle",
  "PENDING" = "pending",
  "SUCCEEDED" = "succeeded",
  "FAILED" = "failed",
}

export enum modeFormLogin {
  "REGISTER" = "register",
  "LOGIN" = "login",
}

export enum modalsEnum {
  "updatepost" = "updatepost",
  "deletepost" = "deletepost",
}
