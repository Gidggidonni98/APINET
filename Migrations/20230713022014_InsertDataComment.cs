using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_REST_DOTNET.Migrations
{
    /// <inheritdoc />
    public partial class InsertDataComment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "createdAt",
                table: "Comments",
                newName: "CreatedAt");

            migrationBuilder.InsertData(
                table: "Comments",
                columns: new[] { "Id", "Author", "CreatedAt", "Description", "Title" },
                values: new object[] { 1, "Angelinho do brasil", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test", "Test" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Comments",
                newName: "createdAt");
        }
    }
}
