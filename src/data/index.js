export const Lanuage = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
];

export const Tone = ["Convicing", "Casual", "Formal", "Funny"];

// Prompts idea can be a string
// Prompt can be an Array
// tags should be the input that will filter the prompt
export const Prompts = [
  {
    prompt:
      "Generate ideas and content structure for article to get enhanced [Keywords] suggestions",
    title: "Blog Idea & Outline",
    description:
      "Generate ideas and content structure for article to get enhanced keywords suggestions.",
    tags: ["blog", "content"],
  },
  {
    prompt: "Write articles based on section [Topics] & [Headlines]",
    title: "Blog Section Writing",
    description: "Write articles based on section topics & headlines",
    tags: ["ads"],
  },
  {
    prompt: "Write articles based on section [Topics] & [Headlines]",
    title: "Blog Section ",
    description: "Write articles based on section topics & headlines",
    tags: ["ads"],
  },
];
