using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    /// <inheritdoc />
    public partial class AreaPrecision : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PermittedExpiryDate",
                table: "AdvertPlane",
                newName: "PermissionExpiryDate");

            migrationBuilder.RenameColumn(
                name: "Permitted",
                table: "AdvertPlane",
                newName: "IsPremium");

            migrationBuilder.AlterColumn<decimal>(
                name: "LongitudeWest",
                table: "Area",
                type: "numeric(7)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7,0)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "LongitudeEast",
                table: "Area",
                type: "numeric(7)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7,0)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "LatitudeSouth",
                table: "Area",
                type: "numeric(7)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7,0)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "LatitudeNorth",
                table: "Area",
                type: "numeric(7)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7,0)",
                oldPrecision: 7);

            migrationBuilder.AddColumn<bool>(
                name: "IsPermitted",
                table: "AdvertPlane",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<decimal>(
                name: "Longitude",
                table: "AdvertObject",
                type: "numeric(7)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7,0)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "Latitude",
                table: "AdvertObject",
                type: "numeric(7)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7,0)",
                oldPrecision: 7);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPermitted",
                table: "AdvertPlane");

            migrationBuilder.RenameColumn(
                name: "PermissionExpiryDate",
                table: "AdvertPlane",
                newName: "PermittedExpiryDate");

            migrationBuilder.RenameColumn(
                name: "IsPremium",
                table: "AdvertPlane",
                newName: "Permitted");

            migrationBuilder.AlterColumn<decimal>(
                name: "LongitudeWest",
                table: "Area",
                type: "numeric(7,0)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "LongitudeEast",
                table: "Area",
                type: "numeric(7,0)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "LatitudeSouth",
                table: "Area",
                type: "numeric(7,0)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "LatitudeNorth",
                table: "Area",
                type: "numeric(7,0)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "Longitude",
                table: "AdvertObject",
                type: "numeric(7,0)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "Latitude",
                table: "AdvertObject",
                type: "numeric(7,0)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7)",
                oldPrecision: 7);
        }
    }
}
