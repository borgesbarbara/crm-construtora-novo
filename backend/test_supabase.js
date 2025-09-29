const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function testConnection() {
  console.log('🔍 Testando conexão com Supabase...');
  console.log('📍 URL:', process.env.SUPABASE_URL);
  console.log('🔑 Service Key:', process.env.SUPABASE_SERVICE_KEY ? 'Configurada' : 'NÃO CONFIGURADA');
  
  try {
    // Testar se tabela consultores existe
    console.log('\n🧪 Testando tabela consultores...');
    const { data: consultores, error: errorConsultores } = await supabase
      .from('corretores')
      .select('id, nome')
      .limit(1);
    
    if (errorConsultores) {
      console.log('❌ Erro na tabela consultores:', errorConsultores.message);
    } else {
      console.log('✅ Tabela consultores OK:', consultores?.length || 0, 'registros');
    }
    
    // Testar se tabela novas_clinicas existe
    console.log('\n🧪 Testando tabela novas_clinicas...');
    const { data: novasClinicas, error: errorNovasClinicas } = await supabase
      .from('novas_clinicas')
      .select('*')
      .limit(1);
    
    if (errorNovasClinicas) {
      console.log('❌ Erro na tabela novas_clinicas:', errorNovasClinicas.message);
    } else {
      console.log('✅ Tabela novas_clinicas OK:', novasClinicas?.length || 0, 'registros');
    }
    
    // Testar listagem de tabelas
    console.log('\n🧪 Listando todas as tabelas...');
    const { data: tabelas, error: errorTabelas } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
    
    if (errorTabelas) {
      console.log('❌ Erro ao listar tabelas:', errorTabelas.message);
    } else {
      console.log('📋 Tabelas disponíveis:');
      tabelas?.forEach(t => console.log('  -', t.table_name));
    }
    
  } catch (error) {
    console.log('💥 Erro geral:', error.message);
  }
}

testConnection();


