import {signal} from "@preact/signals-react";

const postData = signal([])
const moderationResponse = signal([])
const appLaunched = signal(false)
export {postData, moderationResponse, appLaunched}