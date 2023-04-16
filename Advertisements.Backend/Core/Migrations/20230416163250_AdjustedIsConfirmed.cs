using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    /// <inheritdoc />
    public partial class AdjustedIsConfirmed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConfirmationStatus",
                table: "Campaign");

            migrationBuilder.AddColumn<bool>(
                name: "IsFulfilled",
                table: "Campaign",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFulfilled",
                table: "Campaign");

            migrationBuilder.AddColumn<string>(
                name: "ConfirmationStatus",
                table: "Campaign",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
