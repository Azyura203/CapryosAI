import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only for development
});

/**
 * Clean the input text by removing unwanted symbols and gibberish
 */
function cleanText(text: string): string {
  // eslint-disable-next-line no-misleading-character-class
  return text.replace(/[*๐๐gg๐ู๋๖5]/g, '').trim();
}

function isLikelyBurmese(text: string): boolean {
  return /[\u1000-\u109F]/.test(text);
}

/**
 * Translate text to Burmese using OpenAI
 */
export async function translateToBurmese(text: string): Promise<string> {
  try {
    // Clean the input text
    const cleanedText = cleanText(text);

    // Skip translation for short inputs or likely Burmese text
    if (cleanedText.length < 5 || isLikelyBurmese(cleanedText)) {
      return cleanedText;
    }

    // Create a structured prompt with few-shot examples and formal academic tone
    const prompt = `
You are a helpful Burmese language assistant.

Translate the following English text into **formal academic Burmese** that sounds like it was written by a professional university representative. It should be:

- Clear and polite
- Never robotic or wordy
- Avoid repeating words or phrases
- Keep answers appropriate for educational contexts
- Use proper grammar, spacing, and tone

Respond with a **single clean answer**. Do not restate or retry the same information. 
If contact details are already structured, do not repeat them in sentence form.

Here are examples of the translation style:

English: "How can I contact the university?"
Burmese:
"ဆက်သွယ်ရန် အချက်အလက်:

- အီးမေးလ်: info@auston.mm
- ဖုန်း: +959969707000
- လိပ်စာ: Shop House 17, Junction Square, Yangon 11041"

English: "Welcome."
Burmese: "ကြိုဆိုပါတယ်။"

English: "The program is awarded by LJMU and takes 3 years to complete."
Burmese: "ဒီသင်တန်းကို LJMU တက္ကသိုလ်မှ ချီးမြှင့်ထားပြီး သုံးနှစ်ကြာသည်။"

English: "Applicants must have completed Level 5 or equivalent, and submit their transcripts along with the application form. Interviews may be required depending on the program applied for."
Burmese: "လျှောက်ထားသူများသည် Level 5 သို့မဟုတ် အတူတူတန်းချင်းအဆင့်အောင်မြင်ပြီးဖြစ်ရမည်။ လျှောက်လွှာဖြည့်သွင်းရာတွင် အမှတ်စာရွက်များပါဝင်သွင်းရမည်။ လျှောက်ထားသည့်သင်တန်းအလိုက် စစ်ဆေးမေးမြန်းခြင်း ပြုလုပ်နိုင်ပါသည်။"

English: "Hello and thank you for your interest."
Burmese: "မင်္ဂလာပါ။ စိတ်ဝင်စားမှုအတွက် ကျေးဇူးတင်ပါတယ်။"

English: "We’re happy to assist you."
Burmese: "အကူအညီပေးနိုင်ခြင်းအတွက် ဝမ်းမြောက်ပါတယ်။"

English: "This program is awarded by LJMU and takes 3 years to complete."
Burmese: "ဒီသင်တန်းကို LJMU တက္ကသိုလ်မှ ချီးမြှင့်ထားပြီး သုံးနှစ်ကြာသည်။"

English: "Students will gain both theoretical and practical knowledge."
Burmese: "ကျောင်းသားများသည် သီအိုရီနှင့် လက်တွေ့နည်းပညာ နှစ်ခုစလုံးကို သင်ယူရရှိမည်ဖြစ်သည်။"

English: "All courses are conducted in English."
Burmese: "သင်တန်းအားလုံးကို အင်္ဂလိပ်ဘာသာဖြင့် သင်ကြားပေးပါသည်။"

English: "Applicants must have completed Level 5 or equivalent."
Burmese: "လျှောက်ထားသူများသည် Level 5 သို့မဟုတ် တန်းချင်းအဆင့်တူ ကို အောင်မြင်ပြီးဖြစ်ရမည်။"

English: "Please attach all academic transcripts."
Burmese: "သင်ကြားရေးမှတ်တမ်းစာရွက်များအားလုံးကို ထည့်သွင်းပါ။"

English: "An interview may be required depending on the program."
Burmese: "လျှောက်ထားသည့်သင်တန်းအလိုက် မေးမြန်းချက် ပြုလုပ်နိုင်ပါသည်။"

English: "The tuition fee for this program is USD 3,500."
Burmese: "ဤသင်တန်းအတွက် သင်တန်းကြေးမှာ ဒေါ်လာ ၃၅၀၀ ဖြစ်သည်။"

English: "This course lasts approximately 12 months."
Burmese: "ဤသင်တန်းသည် လခနစ် (၁၂) လ ခန့်ကြာမြင့်မည်ဖြစ်သည်။"

English: "Payments can be made in installments."
Burmese: "အရစ်ကျဖြင့် ပေးချေနိုင်ပါသည်။"

English: "Feel free to contact us for more details."
Burmese: "အသေးစိတ်အချက်အလက်များအတွက် ကျွန်ုပ်တို့ထံ ဆက်သွယ်နိုင်ပါသည်။"

English: "For further questions, please reach out to our admissions team."
Burmese: "နောက်ထပ်မေးမြန်းလိုသောအကြောင်းအရာများအတွက် လက်ခံခြင်းအဖွဲ့သို့ ဆက်သွယ်ပေးပါ။"

English: "We look forward to welcoming you."
Burmese: "သင့်အား ကြိုဆိုနိုင်ရန် အမြဲမျှော်လင့်နေပါသည်။"

English: "Orientation for new students will be held next Monday."
Burmese: "အသစ်လာရောက်သင်ကြားမည့်ကျောင်းသားများအတွက် မိတ်ဆက်အစည်းအဝေးကို လာမည့်တနင်္လာနေ့တွင် ပြုလုပ်မည်ဖြစ်သည်။"

English: "Scholarship opportunities are available for outstanding applicants."
Burmese: "ထူးချွန်သောလျှောက်ထားသူများအတွက် ပညာသင်ဆု အခွင့်အလမ်းများ ရရှိနိုင်ပါသည်။"

English: "Yes, we offer that course."
Burmese: "ဟုတ်ကဲ့၊ ဤသင်တန်းကို ကျွန်ုပ်တို့ထံတွင် ရရှိနိုင်ပါသည်။"

English: "Admission is currently open."
Burmese: "လက်ရှိတွင် ဝင်ခွင့်လျှောက်ထားမှု ဖွင့်လှစ်ထားပါသည်။"

English: "This course starts in September."
Burmese: "ဤသင်တန်းကို စက်တင်ဘာလတွင် စတင်မည်ဖြစ်သည်။"

English: "You will receive a confirmation email once your application is submitted."
Burmese: "သင့်လျှောက်လွှာကို တင်သွင်းပြီးပါက အတည်ပြုအီးမေးလ်တစ်စောင် ရရှိမည်ဖြစ်သည်။"

English: "Please ensure all submitted documents are clear and properly scanned."
Burmese: "တင်သွင်းသည့်စာရွက်စာတမ်းများသည် ပုံမှန်ဖြင့် သပ်ရပ်စွာ ဖတ်ရှုနိုင်ရမည်ဖြစ်ပါသည်။"

English: "Our team will review your application and respond within five working days."
Burmese: "သင့်လျှောက်လွှာကို ကျွန်ုပ်တို့၏အသင်းမှ စစ်ဆေးပြီး အလုပ်ရုံးလုပ်ငန်းနေ့ ၅ ရက်အတွင်း တုံ့ပြန်ပေးမည်ဖြစ်ပါသည်။"

English: "Applicants without an IELTS score may be required to take an internal English placement test. This helps us ensure students meet the language requirements."
Burmese: "IELTS ရမှတ်မရှိသောလျှောက်ထားသူများသည် ကျောင်းတွင်း အင်္ဂလိပ်စာအဆင့်သတ်မှတ်စစ်စာမေးပွဲ ထပ်မံဖြေဆိုရန် လိုအပ်နိုင်ပါသည်။ ၎င်းသည် ကျောင်းသားများ၏ ဘာသာစကားအရည်အချင်းကို သေချာစေရန်ဖြစ်ပါသည်။"

English: "Due to high demand, seats are limited. We recommend submitting your application as early as possible to secure a place in the program."
Burmese: "တက္ကသိုလ်သို့ ဝင်ခွင့်လျှောက်ထားလိုသူများ များပြားနေသဖြင့် နေရာအရေအတွက် ကန့်သတ်ထားပါသည်။ သင်တန်းသို့ ဝင်ခွင့်ရရှိရန်အတွက် မကြာမီ လျှောက်ထားရန် အကြံပြုပါသည်။"

English: "If you have any further questions regarding the curriculum, tuition, or documents required, please do not hesitate to reach out to our academic coordinator."
Burmese: "သင်တန်းအကြောင်းအရာ၊ သင်တန်းကြေး သို့မဟုတ် လိုအပ်သောစာရွက်စာတမ်းများနှင့် ပတ်သက်၍ နောက်ထပ်မေးမြန်းလိုသည့်အရာများရှိပါက ကျောင်း၏ သင်တန်းညွှန်ကြားရေးမှူးထံ ဆက်သွယ်နိုင်ပါသည်။"

English: "Thank you. For more information, please contact the school directly."
Burmese: "ကျေးဇူးတင်ပါသည်။ ပိုမိုသိရှိလိုပါက ကျောင်းကို တိုက်ရိုက်ဆက်သွယ်နိုင်ပါသည်။"

Text:
"${cleanedText}"

Translation:`;

    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a Burmese translation assistant for a chatbot. Your tone is clear, human, and respectful. Never repeat characters or phrases. Do not over-explain. Keep answers short and natural.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.55,
      top_p: 0.9,
      frequency_penalty: 0.3,
      presence_penalty: 0.1,
    });

    // Extract the translated text
    const translatedText = response.choices[0]?.message?.content?.trim() ?? '';

    // Return original if translated text is garbage
    if (/([က-အ])\1{4,}/.test(translatedText)) {
      return "😅 အပြန်အလှန်ဘာသာပြန်ရာတွင် ပြဿနာတက်ခဲ့ပါတယ်။ ကျေးဇူးပြု၍ ပြန်စစ်ပါ။";
    }

    return translatedText + "\n\nပိုမိုသိရှိလိုပါက ကျောင်းကို တိုက်ရိုက်ဆက်သွယ်နိုင်ပါသည်။";
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
}