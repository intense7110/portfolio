const MICROCMS_ENDPOINT = "https://intense7110.microcms.io/api/v1/works";

const fallbackWorks = [
  {
    title: "京都能力開発短期大学校",
    url: "https://www3.jeed.go.jp/kyoto/college/",
    role: "サイトリニューアル / CMS連携 / JavaScript実装",
    text: "本番環境にWordPressを設置できない制約に対し、外部WordPressをヘッドレスCMSとして運用する構成を設計。差分データとフルデータを取得できる専用ダウンロードAPI、GitHub Actionsによる静的ファイルのデプロイ導線、アニメーションを含むJavaScript実装を担当しました。",
    tools: ["Astro", "JavaScript", "Stylus", "PHP", "GitHub Actions", "Figma", "WordPress"],
  },
  {
    title: "メジナビ",
    url: "https://www.mejiro.ac.jp/univ/mejinavi2026/",
    role: "大学プロモーションサイト / アニメーション / 画面遷移",
    text: "Swupを使ったシームレスなページ遷移と、サイト全体のアニメーションを実装。描画オブジェクトが多い画面でもスマートフォンで重くなりにくいよう、一部を除いてCSSアニメーションへ置き換え、体験と軽量化のバランスを調整しました。",
    tools: ["Astro", "JavaScript", "Stylus", "Figma"],
  },
  {
    title: "NIKKE バイオハザードコラボ LP",
    url: "http://toys--nikke-biohazard--main.repo.testup.me/",
    role: "LP / JavaScript / API / Canvas生成",
    text: "JS全般とAPIを担当。フォーム入力による簡易謎解きゲーム、クリア人数に応じた合成壁紙のダウンロード機能を実装しました。生成AIではなくCanvasで画像を合成する方式を提案し、統計管理にはクライアントが確認しやすいスプレッドシートを簡易DBとして活用しました。",
    tools: ["Astro", "JavaScript", "Stylus", "Figma", "Spreadsheet", "AWS"],
    note: "公開終了 / Basic認証: ID a、Password 123",
  },
];

const normalizeTools = (tools) => {
  if (Array.isArray(tools)) {
    return tools.filter(Boolean);
  }

  if (typeof tools === "string") {
    return tools
      .split(",")
      .map((tool) => tool.trim())
      .filter(Boolean);
  }

  return [];
};

const normalizeWork = (work) => ({
  title: work.title ?? "",
  thumb: work.thumb?.url ? work.thumb : null,
  role : work.role ?? "",
  tools: normalizeTools(work.tools),
  text : work.text ?? "",
  url  : work.url ?? "",
  note : work.note ?? "",
});

export const getWorks = async () => {
  const apiKey = import.meta.env.MICROCMS_API_KEY;

  if (!apiKey) {
    return fallbackWorks;
  }

  try {
    const response = await fetch(`${MICROCMS_ENDPOINT}?limit=100&orders=-publishedAt`, {
      headers: {
        "X-MICROCMS-API-KEY": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`microCMS API responded with ${response.status}`);
    }

    const data = await response.json();
    const works = Array.isArray(data.contents) ? data.contents.map(normalizeWork) : [];

    return works.length > 0 ? works : fallbackWorks;
  } catch (error) {
    console.warn("[microCMS] Failed to fetch works. Using fallback data.", error);
    return fallbackWorks;
  }
};
