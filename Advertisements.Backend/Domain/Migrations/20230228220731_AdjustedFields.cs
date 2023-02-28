using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class AdjustedFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExpirationDate",
                table: "AdvertPlane");

            migrationBuilder.RenameColumn(
                name: "Illuminated",
                table: "AdvertPlane",
                newName: "Permitted");

            migrationBuilder.AddColumn<string[]>(
                name: "Regions",
                table: "Area",
                type: "text[]",
                nullable: false,
                defaultValue: new string[0]);

            migrationBuilder.AddColumn<DateTime>(
                name: "PermittedExpiryDate",
                table: "AdvertPlane",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "AreaId",
                table: "AdvertObject",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<bool>(
                name: "Illuminated",
                table: "AdvertObject",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_AdvertObject_AreaId",
                table: "AdvertObject",
                column: "AreaId");

            migrationBuilder.AddForeignKey(
                name: "FK_AdvertObject_Area_AreaId",
                table: "AdvertObject",
                column: "AreaId",
                principalTable: "Area",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdvertObject_Area_AreaId",
                table: "AdvertObject");

            migrationBuilder.DropIndex(
                name: "IX_AdvertObject_AreaId",
                table: "AdvertObject");

            migrationBuilder.DropColumn(
                name: "Regions",
                table: "Area");

            migrationBuilder.DropColumn(
                name: "PermittedExpiryDate",
                table: "AdvertPlane");

            migrationBuilder.DropColumn(
                name: "AreaId",
                table: "AdvertObject");

            migrationBuilder.DropColumn(
                name: "Illuminated",
                table: "AdvertObject");

            migrationBuilder.RenameColumn(
                name: "Permitted",
                table: "AdvertPlane",
                newName: "Illuminated");

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpirationDate",
                table: "AdvertPlane",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
