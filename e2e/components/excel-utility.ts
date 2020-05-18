import * as XLSX from 'xlsx';

export class ExcelUtility {

    // Syntax:
    //getTestdata('Testcaseid', 'columnName', 'sheetName' );
    //puttestdata('cellvalue', 'testcaseid', 'columnname', 'sheetName );

    public static readonly filepath = './e2e/data/LoginScenario.xlsx';

    public static async getTestdata(rowFinder: string, columnFinder: string, sheetFinder: string): Promise<string> {

        let sheetName: XLSX.WorkSheet = await this.getSheet(sheetFinder);
        let columnNumber: number = await this.getColumnNumber(sheetName, columnFinder);
        let rowNumber: number = await this.getRowNumber(sheetName, rowFinder, 0);
        const cellData = sheetName[XLSX.utils.encode_cell({r: rowNumber, c:columnNumber})];
        let resultVal: string = cellData.v;
        let resultCellDataValue: string = resultVal.trim();
        return resultCellDataValue;
    }

    private static async getSheet(sheetName: string): Promise<XLSX.WorkSheet> {

        const table: XLSX.WorkBook = XLSX.readFile(this.filepath);
        const sheetNameList: string[] = table.SheetNames;
        const sheetNameValue: number = sheetNameList.indexOf(sheetName);
        const sheet: XLSX.WorkSheet = table.Sheets[table.SheetNames[sheetNameValue]];
        return sheet;
    }

    private static async getColumnNumber(sheetName: XLSX.WorkSheet, columnName: string): Promise<number> {

        let totalColumns: number = await this.getColumnCount(sheetName);
        for (let colNum = 0; colNum <= totalColumns; colNum++) {
            const columnData = sheetName[XLSX.utils.encode_cell({r: 0, c:colNum })];
            let columnHeader: string = columnData.v;
            let columnValue: string = columnHeader.trim();
            if (columnValue === columnName) {
                return colNum;
            }
        }

    }

    private static async getRowNumber(sheetName: XLSX.WorkSheet, environmentinfo: string, columnNumber: number): Promise<number> {
        let totalRows: number = await this.getRowCount(sheetName);
        for (let rowNum = 0; rowNum <= totalRows; rowNum++) {
            const rowData = sheetName[XLSX.utils.encode_cell({r: rowNum, c:columnNumber })];
            let rowResult: string = rowData.v;
            let rowValue: string = rowResult.trim();
            if (rowValue === environmentinfo) {
                return rowNum;
            }
        }   

    }

    private static async getColumnCount(sheetName: XLSX.WorkSheet): Promise<number> {
        
        let range: XLSX.Range = XLSX.utils.decode_range(sheetName['!ref']);
        let totalColumns: number = range.e.c;
        return totalColumns;
    }


    private static async getRowCount(sheetName: XLSX.WorkSheet): Promise<number> {
        let range: XLSX.Range = XLSX.utils.decode_range(sheetName['!ref']);
        let totalRows: number = range.e.r;
        return totalRows;
    }


    public static async putTestData(cellData: string, rowFinder: string, columnFinder: string, sheetFinder: string = process.env.scenarioName) {
        const table: XLSX.WorkBook = XLSX.readFile(this.filepath);
        const workSheet: XLSX.WorkSheet = table.Sheets[sheetFinder];
        let columnNumber: number = await this.getColumnNumber(workSheet, columnFinder);
        let rowNumber: number = await this.getRowNumber(workSheet, rowFinder, 0);
        const cell = workSheet[XLSX.utils.encode_cell({c: columnNumber, r: rowNumber})].v;
        console.log(cell);
        workSheet[XLSX.utils.encode_cell({c: columnNumber, r: rowNumber})].v = cellData;
        XLSX.writeFile(table, this.filepath);
    }

}