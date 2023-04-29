using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.Migrations
{
    /// <inheritdoc />
    public partial class CampaignPlanePrincipalAdjustment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_CampaignPlane",
                table: "CampaignPlane");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CampaignPlane",
                table: "CampaignPlane",
                columns: new[] { "CampaignId", "PlaneId", "WeekTo", "WeekFrom" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_CampaignPlane",
                table: "CampaignPlane");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CampaignPlane",
                table: "CampaignPlane",
                columns: new[] { "CampaignId", "PlaneId" });
        }
    }
}
