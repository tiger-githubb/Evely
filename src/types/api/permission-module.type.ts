import { Module } from "./module.type";
import { Permission } from "./permission.type";

export interface PermissionModule {
  module: Module;
  permission: Permission;
}
