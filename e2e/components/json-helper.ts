import fs = require('fs');

export class ReusuableFunctions {

public static readonly filepath = './e2e/data/test-data.json';

static async updatejson(data:string): Promise<void> {

let filePath = await fs.readFileSync(this.filepath);
let file = await JSON.parse(filePath.toString());

file.Sampleone[0].sample1 = data;

fs.writeFileSync(this.filepath, JSON.stringify(file));

}

static async getjson(): Promise<string> {

let filePath = await fs.readFileSync(this.filepath);
let json = await JSON.parse(filePath.toString());

return json.Sampleone[0].sample1;

}
}
