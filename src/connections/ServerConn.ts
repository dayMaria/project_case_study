import { ConnectionManager } from 'typeorm';

export class ServerConn {
  private static connectionManager: ConnectionManager = new ConnectionManager();
  
  static async createConnection(connectionOptions?) {
    this.connectionManager.create({
      name: 'postgresConnection',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
    });
  }

  static async createConnectionParams(connectionOptions?) {
    this.connectionManager.create({
      name: connectionOptions.name + 'postgres',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
    });
  }

  static async getAllDatabase(connectionName: string): Promise<any> {
    let result = [];
    try {
      const conn = await this.connectionManager.get(connectionName);
      const error = await conn.connect();
      if (!(error instanceof Error)) {
        let query = '';
        if (conn.options.type === 'postgres')
          query = 'select datname from pg_database where datistemplate=false';
        if (conn.options.type === 'mysql') query = 'show databases';
        console.log(
          '/********* ' + conn.options.type.toUpperCase() + '**********/',
        );
        result = await conn.manager.query(query);
      }
    } catch (error) {
      throw error;
    }
    return result;
  }
}
