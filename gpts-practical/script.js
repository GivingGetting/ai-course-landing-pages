const header = document.querySelector("[data-header]");
const form = document.querySelector("[data-interest-form]");
const statusNode = document.querySelector("[data-form-status]");

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const buildInterestMessage = (formData) => {
  const name = formData.get("name")?.trim() || "未填写";
  const goal = formData.get("goal")?.trim() || "想了解 AI Agent 入门实操课";
  const level = formData.get("level") || "未填写";

  return [
    "我想咨询 AI Agent 智能体入门实操课：",
    `名字：${name}`,
    `想做的 AI 助手：${goal}`,
    `当前基础：${level}`,
    "希望了解：课程时间、报名方式、是否适合我的场景",
  ].join("\n");
};

const copyToClipboard = async (text) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.inset = "auto auto 0 0";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
};

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = buildInterestMessage(new FormData(form));

  try {
    await copyToClipboard(message);
    if (statusNode) {
      statusNode.textContent = "已复制咨询信息。";
    }
  } catch (error) {
    if (statusNode) {
      statusNode.textContent = message;
    }
  }
});
