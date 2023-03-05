using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    /// <inheritdoc />
    public partial class AddCoordinatePrecision : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "LongitudeWest",
                table: "Area",
                type: "numeric(7)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<decimal>(
                name: "LongitudeEast",
                table: "Area",
                type: "numeric(7)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<decimal>(
                name: "LatitudeSouth",
                table: "Area",
                type: "numeric(7)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<decimal>(
                name: "LatitudeNorth",
                table: "Area",
                type: "numeric(7)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<decimal>(
                name: "Longitude",
                table: "AdvertObject",
                type: "numeric(7)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<decimal>(
                name: "Latitude",
                table: "AdvertObject",
                type: "numeric(7)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "LongitudeWest",
                table: "Area",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "LongitudeEast",
                table: "Area",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "LatitudeSouth",
                table: "Area",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "LatitudeNorth",
                table: "Area",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "Longitude",
                table: "AdvertObject",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "Latitude",
                table: "AdvertObject",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7)",
                oldPrecision: 7);
        }
    }
}
