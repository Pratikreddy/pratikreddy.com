export const FORBIDDEN_CLASSES = [
  "finance_rows",
  "meeting_videos",
  "meeting_transcripts",
  "meeting_screenshots",
  "x_raw_text",
  "credentials",
  "secrets",
  "private_docs",
  "private_costs",
  "personal_raw_records",
];

const FORBIDDEN_KEY_PATTERN =
  /(password|secret|credential|api[_-]?key|access[_-]?key|account|balance|transcript|screenshot|video|raw[_-]?text|finance[_-]?rows|private[_-]?cost)/i;

const FORBIDDEN_VALUE_PATTERN =
  /(\/Users\/|source_proxy|\.mp4\b|\.wav\b|\.srt\b|\.vtt\b|account number|api key|password|secret|raw transcript|raw x|statement row|private cost)/i;

function isAllowedPolicyList(path) {
  const joined = path.join(".");
  return joined === "privacy.forbiddenClasses" || joined.startsWith("privacy.forbiddenClasses.");
}

function inspect(value, path = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => inspect(item, [...path, String(index)]));
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, nested] of Object.entries(value)) {
      const nestedPath = [...path, key];
      if (!isAllowedPolicyList(nestedPath) && FORBIDDEN_KEY_PATTERN.test(key)) {
        throw new Error(`Public feed blocked forbidden key at ${nestedPath.join(".")}`);
      }
      inspect(nested, nestedPath);
    }
    return;
  }

  if (typeof value === "string" && !isAllowedPolicyList(path) && FORBIDDEN_VALUE_PATTERN.test(value)) {
    throw new Error(`Public feed blocked forbidden value at ${path.join(".")}`);
  }
}

export function assertPublicPayloadSafe(payload) {
  inspect(payload, []);
  return true;
}
