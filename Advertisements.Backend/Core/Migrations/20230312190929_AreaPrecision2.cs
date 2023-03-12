using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    /// <inheritdoc />
    public partial class AreaPrecision2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "LongitudeWest",
                table: "Area",
                type: "double precision",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7,0)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<double>(
                name: "LongitudeEast",
                table: "Area",
                type: "double precision",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7,0)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<double>(
                name: "LatitudeSouth",
                table: "Area",
                type: "double precision",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7,0)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<double>(
                name: "LatitudeNorth",
                table: "Area",
                type: "double precision",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7,0)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<double>(
                name: "Longitude",
                table: "AdvertObject",
                type: "double precision",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7,0)",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<double>(
                name: "Latitude",
                table: "AdvertObject",
                type: "double precision",
                precision: 7,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7,0)",
                oldPrecision: 7);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "LongitudeWest",
                table: "Area",
                type: "numeric(7,0)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "LongitudeEast",
                table: "Area",
                type: "numeric(7,0)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "LatitudeSouth",
                table: "Area",
                type: "numeric(7,0)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "LatitudeNorth",
                table: "Area",
                type: "numeric(7,0)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "Longitude",
                table: "AdvertObject",
                type: "numeric(7,0)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision",
                oldPrecision: 7);

            migrationBuilder.AlterColumn<decimal>(
                name: "Latitude",
                table: "AdvertObject",
                type: "numeric(7,0)",
                precision: 7,
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision",
                oldPrecision: 7);
        }
    }
}
