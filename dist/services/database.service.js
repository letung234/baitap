"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const config_1 = require("../constants/config");
const uri = `mongodb+srv://${config_1.envConfig.dbUsername}:${config_1.envConfig.dbPassword}@cluster0.ycjjawi.mongodb.net`;
class DatabaseService {
    constructor() {
        this.client = new mongodb_1.MongoClient(uri);
        this.db = this.client.db(config_1.envConfig.dbName);
    }
    async connect() {
        try {
            await this.db.command({ ping: 1 });
            console.log(`Connect successful`);
            // Tạo index khi kết nối thành công
            await this.createIndexes();
        }
        catch (error) {
            console.log('Database Error :', error);
            throw error;
        }
    }
    get SalaryPortion() {
        return this.db.collection('SalaryPortion');
    }
    get SalaryStructure() {
        return this.db.collection('SalaryStructure');
    }
    get FormOfPayment() {
        return this.db.collection('FormOfPayment');
    }
    get PayMentAccount() {
        return this.db.collection('PayMentAccount');
    }
    get Company() {
        return this.db.collection('Company');
    }
    get User() {
        return this.db.collection('User');
    }
    get Role() {
        return this.db.collection('Role');
    }
    get refreshTokens() {
        return this.db.collection('refresh_tokens');
    }
    get Account() {
        return this.db.collection('Account');
    }
    // Kiểm tra xem index đã tồn tại chưa trước khi tạo index
    async createIndexes() {
        const existingIndexes = await this.SalaryPortion.indexes();
        const existingIndexNames = existingIndexes.map((index) => index.name);
        // Tạo index cho SalaryPortion nếu chưa tồn tại
        if (!existingIndexNames.includes('index_ten')) {
            await this.SalaryPortion.createIndex({ ten: 1 }, { name: 'index_ten' });
        }
        if (!existingIndexNames.includes('index_is_active')) {
            await this.SalaryPortion.createIndex({ is_active: 1 }, { name: 'index_is_active' });
        }
        if (!existingIndexNames.includes('index_loai')) {
            await this.SalaryPortion.createIndex({ loai: 1 }, { name: 'index_loai' });
        }
        if (!existingIndexNames.includes('index_ngay_tao')) {
            await this.SalaryPortion.createIndex({ ngay_tao: 1 }, { name: 'index_ngay_tao' });
        }
        if (!existingIndexNames.includes('index_deleted')) {
            await this.SalaryPortion.createIndex({ deleted: 1 }, { name: 'index_deleted' });
        }
        if (!existingIndexNames.includes('index_id_ten')) {
            await this.SalaryPortion.createIndex({ _id: 1, ten: 1 }, { name: 'index_id_ten' });
        }
        // Tạo index cho refreshTokens nếu chưa tồn tại
        const existingRefreshIndexes = await this.refreshTokens.indexes();
        const existingRefreshIndexNames = existingRefreshIndexes.map((index) => index.name);
        if (!existingRefreshIndexNames.includes('index_token')) {
            await this.refreshTokens.createIndex({ token: 1 }, { name: 'index_token' });
        }
        // Tạo index cho SalaryStructure nếu chưa tồn tại
        const existingSalaryStructureIndexes = await this.SalaryStructure.indexes();
        const existingSalaryStructureIndexNames = existingSalaryStructureIndexes.map((index) => index.name);
        if (!existingSalaryStructureIndexNames.includes('index_salarystructure_ten')) {
            await this.SalaryStructure.createIndex({ ten: 1 }, { name: 'index_salarystructure_ten' });
        }
        if (!existingSalaryStructureIndexNames.includes('index_salarystructure_is_active')) {
            await this.SalaryStructure.createIndex({ is_active: 1 }, { name: 'index_salarystructure_is_active' });
        }
        if (!existingSalaryStructureIndexNames.includes('index_update_at')) {
            await this.SalaryStructure.createIndex({ updated_at: 1 }, { name: 'index_update_at' });
        }
        if (!existingSalaryStructureIndexNames.includes('index_salaryStructure_deleted')) {
            await this.SalaryStructure.createIndex({ deleted: 1 }, { name: 'index_salaryStructure_deleted' });
        }
        console.log('Indexes created successfully');
    }
}
const databaseService = new DatabaseService();
exports.default = databaseService;
