using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Estudo.Tarefas.Api.Data
{
    public sealed class DBSession : IDisposable
    {
        public IDbConnection Connection { get; }
        public IDbTransaction Transaction { get; set; }
        public IConfiguration _configuration { get; }

        public DBSession(IConfiguration configuration)
        {
            _configuration = configuration;
            var conexaoSQLServer = configuration.GetConnectionString("DefaultConnectio");
            Connection = new SqlConnection(conexaoSQLServer);
            Connection.Open();
        }

        public void Dispose() => Connection?.Dispose();
    }
}
