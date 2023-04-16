using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    /// <inheritdoc />
    public partial class RemoveCampaignPlaneFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WeekFrom",
                table: "CampaignPlane");

            migrationBuilder.DropColumn(
                name: "WeekTo",
                table: "CampaignPlane");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WeekFrom",
                table: "CampaignPlane",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WeekTo",
                table: "CampaignPlane",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
