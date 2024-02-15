const surveyData = {
  title_en: "Customer Survey",
  title_ar: "استبيان رضى العملاء",
  description: `Your Opinion Counts - Our goal is your satisfaction. 
                    We strive to provide the best services for you.
                   So please take a moment to let us know how we are doing!`,
};


const projectData =  {
  name: "ENFM",
  location: "Dubai",
  date: "2024-02-16",
}


const responses = 
    {
    'radio':[
  
    {
      id: "r1",
      answer_en: "Strongly Disagree",
      answer_ar: "لا أوافق بشدة",
      type: "radio",
      response:''
    },
    {
      id: "r2",
      answer_en: "Disagree",
      answer_ar: "لا أوافق)",
      type: "radio",
      response:''
    },
    {
      id: "r3",
      answer_en: "Neutral",
      answer_ar: "صحيح لحد ما)",
      type: "radio",
       response:''
    },
    {
      id: "r4",
      answer_en: "Agree",
      answer_ar: "أوافق)",
      type: "radio",
       response:''
    },
    {
      id: "r5",
      answer_en: "Strongly Agree",
      answer_ar: "أوافق بشدة)",
      type: "radio",
      response:''
    }
  ],
  
    'text': [{id: 't1', response:''}],
  
    'signature': [{id: 'z1', response:''}]
  }
  
  
  const services = [
    {
      id: "s1",
      service_en: "QUALITY OF SERVICES",
      service_ar: "جودة الخدمات",
      type:'radio',
      assertions: [
        {
          id: "a1",
          service_id: "s1",
          content_en: "We deliver the services as set out in our contract",
          content_ar: "نقدم الخدمات على النحو المبين في العقد المبرم بيننا",
          answers : responses
        },
        {
          id: "a2",
          service_id: "s1",
          content_en: "We are responsive to your needs",
          content_ar: "نستجيب لاحتياجاتكم",
          answers : responses
        },
        {
          id: "a3",
          service_id: "s1",
          content_en: "We communicate in a timely and effective manner",
          content_ar: "تواصل معكم في الوقت المناسب وبطريقة فعالة",
          answers : responses
        },
        {
          id: "a4",
          service_id: "s1",
          content_en: "The staff we provide conduct themselves professionally",
          content_ar: "الموظفون الذين نقدمهم لخدمتكم يتصرفون باحترافية",
          answers : responses
        },
        {
          id: "a5",
          service_id: "s1",
          content_en: "We effectively manage emergencies and crises",
          content_ar: "دير بشكل فعال الأعمال الطارئة والأزمات",
          answers : responses
        },
      ],
    },
    {
      id: "s2",
      service_en: "MANAGEMENT OF SERVICES",
      service_ar: "إدارة الخدمات ",
      type:'radio',
      assertions: [
        {
          id: "b1",
          service_id: "s2",
          content_en: `There is a defined management structure in place at EnFM that 
          supports the services we provide`,
          content_ar: "التراتبية الإدارية واضحة وتدعم الخدمات التي نؤديها",
          answers : responses
        },
  
        {
          id: "b2",
          service_id: "s2",
          content_en: `There is consistency in your points of contact at EnFM enabling you 
     to build strong professional relationships`,
          content_ar:
            "نقاط التواصل مع الادارة ثابتة مما يدعم بناء علاقات مهنية قوية مع الشركة",
            answers : responses
        },
  
        {
          id: "b3",
          service_id: "s2",
          content_en: `We have a clear process that can be followed for escalation 
     of any challenges or issues`,
          content_ar:
            "في حال عدم التجاوب من قبل فريق المخصص للأعمال أو في الأزمات فان عملية التصعيد للإدارة العليا واضحة وفعالة ",
            answers : responses
        },
  
        {
          id: "b4",
          service_id: "s2",
          content_en: `We encourage constructive feedback on our services to support
     improvements`,
          content_ar: "نعمل بملاحظاتكم على أدائنا ونستجيب لها بكفاءة ",
          answers : responses
        },
        {
          id: "b5",
          service_id: "s2",
          content_en: `We take ownership of the services provided`,
          content_ar: "فريقنا متمكن و محترف في الخدمات المقدمة ",
          answers : responses
        },
      ],
    },
    {
      id: "s3",
      service_en: "GENERAL",
      service_ar: "عموميات",
      type:'radio',
      assertions: [
        {
          id: "c1",
          service_id: "s3",
          content_en:
            "You would recommend EnFM services to a friend or colleague",
          content_ar: "تنصحون بخدمات شركتنا لأصدقائكم أو زملائكم",
          answers : responses
        },
        {
          id: "c2",
          service_id: "s3",
          content_en: `We enable you to concentrate on your core business 
     whilst we manage your facilities services in the background`,
          content_ar:
            "حن نتيح لك التركيز على عملك الأساسي بينما ندير خدمات المرافق الخاصة بك ",
            answers : responses
        },
        {
          id: "c3",
          service_id: "s3",
          content_en: `You would consider EnFM to support you with other business 
      solutions we provide`,
          content_ar:
            "تنظرون لإمكانية اعتماد شركتنا لخدمات أخرى نؤديها ولا نقدمها لكم حالياً ",
            answers : responses
        }
      ],
    },
      {
      id: "s4",
      service_en: "OPEN ANSWERS",
      service_ar: "",
      type:'text',
      assertions: [
        {
          id: "d1",
          service_id: "s4",
          content_en:
            "Comments and Additional Feedback ",
          content_ar: "التعليقات الإضافية",
          answers : responses
        }
        ]
      },
      {
      id: "s5",
      service_en: "SIGNATURE",
      service_ar: "",
      type:'signature',
      assertions: [
          {
          id: "e1",
          service_id: "s5",
          content_en:
            "Client Representative Name & Signature",
          content_ar: "سم ممثل العميل وتوقيعه",
          answers : responses
        }
        
        ]
      }
  ]

  export { services , projectData, surveyData}
  