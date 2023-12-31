import CityCenterCoordinateMigration from "./Migrations/CityCenterCoordinateMigration";
import CountryCodeMigration from "./Migrations/CountryCodeMigration";
import HostelWeatherDataMigration from "./Migrations/HostelWeatherDataMigration";
import RemoveDuplicateIdsMigration from "./Migrations/RemoveDuplicateIdsMigration";
import Planner from "./Planner";

/**
 * Migration: Adds all current features to the journey
 */
export default class MigrationManager {
  static migrations = [
    new RemoveDuplicateIdsMigration(),
    new HostelWeatherDataMigration(),
    new CountryCodeMigration(),
    new CityCenterCoordinateMigration(),
  ];

  async migrate(planner: Planner) {
    console.log("Running migrations");
    planner.logging.log("Running migrations");
    for (const migration of MigrationManager.migrations) {
      if (await migration.hasToRun(planner)) {
        console.log(`Running migration ${migration.name}`);
        planner.logging.log(`Running migration ${migration.name}`);
        await planner.withLoading(() => migration.run(planner));
        planner.emit("change");
        planner.logging.log(`Migration ${migration.name} done`);
      }
    }
  }
}
