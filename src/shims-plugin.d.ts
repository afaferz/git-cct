import { Alert } from "./lib/Alert";

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $alert: any
    }
}