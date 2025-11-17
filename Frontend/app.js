/* ============================
   Painel Admin - Agente IA
   app.js
   ============================ */

let authHeader = "";

// ========================
// Helper Functions
// ========================

function setStatus(text, statusClass = "") {
  const indicator = document.getElementById("status-indicator");
  indicator.textContent = text;
  indicator.className = "status " + statusClass;
}

async function fetchWithAuth(url, options = {}) {
  if (!authHeader) {
    alert("Por favor, faça login primeiro!");
    throw new Error("Sem autenticação");
  }

  const opts = {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: authHeader,
    },
  };

  const response = await fetch(url, opts);
  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }
  return response;
}

// ========================
// Autenticação
// ========================

document.getElementById("connectBtn").addEventListener("click", () => {
  const user = document.getElementById("authUser").value.trim();
  const pass = document.getElementById("authPass").value.trim();

  if (!user || !pass) {
    alert("Por favor, insira usuário e senha.");
    return;
  }

  authHeader = "Basic " + btoa(`${user}:${pass}`);
  setStatus("Autenticado localmente ✔️", "ok");
});

// ========================
// Health Check
// ========================

async function checkHealth() {
  try {
    const res = await fetch("/health");
    if (res.ok) {
      setStatus("API Online ✅", "ok");
    } else {
      setStatus("API Offline ❌", "error");
    }
  } catch {
    setStatus("API Offline ❌", "error");
  }
}

document.getElementById("btnCheckHealth").addEventListener("click", checkHealth);
checkHealth(); // verifica assim que a página abre

// ========================
// Reindexação da Base
// ========================

document.getElementById("btnReindex").addEventListener("click", async () => {
  try {
    const res = await fetchWithAuth("/admin/reindex", { method: "POST" });
    const data = await res.json();
    alert("Reindexação disparada com sucesso 🚀");
    console.log("Reindex:", data);
  } catch (err) {
    alert("Erro ao reindexar: " + err.message);
  }
});

// ========================
// Upload de Documentos
// ========================

document.getElementById("btnUpload").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const docType = document.getElementById("docType").value;

  if (!fileInput.files.length) {
    alert("Selecione um arquivo primeiro.");
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);
  formData.append("type", docType);

  try {
    const res = await fetchWithAuth("/admin/docs", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    alert(`📄 Documento enviado com sucesso! ID: ${data.id}`);
  } catch (err) {
    alert("Erro ao enviar documento: " + err.message);
  }
});

// ========================
// Carregar Logs
// ========================

document.getElementById("btnLoadLogs").addEventListener("click", async () => {
  try {
    const res = await fetchWithAuth("/admin/logs");
    const logs = await res.json();
    const output = document.getElementById("logsOutput");

    if (!logs.length) {
      output.textContent = "Nenhum log encontrado.";
      return;
    }

    output.textContent = logs
      .map(
        (l) =>
          `[${l.created_at}] (${l.level.toUpperCase()}) ${l.message}\n${JSON.stringify(
            l.meta || {},
            null,
            2
          )}\n`
      )
      .join("\n");
  } catch (err) {
    alert("Erro ao carregar logs: " + err.message);
  }
});

// ========================
// Carregar Conversas Recentes
// ========================

document.getElementById("btnLoadConversations").addEventListener("click", async () => {
  try {
    const res = await fetchWithAuth("/admin/conversations");
    const conversations = await res.json();
    const list = document.getElementById("conversationsList");
    list.innerHTML = "";

    if (!conversations.length) {
      list.innerHTML = "<p>Nenhuma conversa encontrada.</p>";
      return;
    }

    conversations.forEach((c) => {
      const item = document.createElement("div");
      item.className = "conversation-item";
      item.innerHTML = `
        <strong>ID:</strong> ${c.id}<br>
        <strong>Usuário:</strong> ${c.wa_user_id}<br>
        <strong>Data:</strong> ${new Date(c.created_at).toLocaleString()}
      `;
      list.appendChild(item);
    });
  } catch (err) {
    alert("Erro ao carregar conversas: " + err.message);
  }
});
