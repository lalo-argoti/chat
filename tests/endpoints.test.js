// tests/endpoints.test.js

const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api'; // Cambia según tu entorno

// Datos de prueba
const testAssistant = {
  name: 'Asistente Test',
  language: 'Español',
  tone: 'Formal',
  responseLength: { short: 30, medium: 50, long: 20 },
  audioEnabled: true,
  rules: 'Eres un asistente de prueba.'
};

// Función de prueba genérica
async function testEndpoint(method, url, data) {
  try {
    const res = await axios({ method, url, data });
    console.log(`[OK] ${method.toUpperCase()} ${url} => Status: ${res.status}`);
    return res.data;
  } catch (err) {
    if (err.response) {
      console.error(`[FAIL] ${method.toUpperCase()} ${url} => Status: ${err.response.status}`);
    } else {
      console.error(`[ERROR] ${method.toUpperCase()} ${url} => ${err.message}`);
    }
    return null;
  }
}

// Función principal de pruebas
async function runTests() {
  console.log('--- INICIANDO PRUEBAS DE ENDPOINTS ---');

  // 1. Listar asistentes
  await testEndpoint('get', `${BASE_URL}/assistants`);

  // 2. Crear asistente
  const created = await testEndpoint('post', `${BASE_URL}/assistants`, testAssistant);

  // 3. Obtener asistente creado
  if (created && created.id) {
    await testEndpoint('get', `${BASE_URL}/assistants/${created.id}`);

    // 4. Actualizar asistente
    const updatedData = { ...testAssistant, name: 'Asistente Actualizado' };
    await testEndpoint('put', `${BASE_URL}/assistants/${created.id}`, updatedData);

    // 5. Eliminar asistente
    await testEndpoint('delete', `${BASE_URL}/assistants/${created.id}`);
  }

  console.log('--- PRUEBAS FINALIZADAS ---');
}

runTests();
