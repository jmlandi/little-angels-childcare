import React from "react";
import CMS from "src/pages/components/Cms";

const PhilosophyCMS: React.FC = () => {
  return (
    <CMS
      pageName="philosophy"
      contentStructure={{
        header: "Play Based Philosophy — Playing to Learn/Learning to Play",
        paragraph_1: "There's a lot happening during playtime. Little ones are lifting, dropping, looking, pouring, bouncing, hiding, building, knocking down, and more. Children are more than busy when they're playing. When your children play with you, they are also learning that they are loved and important and that they are fun to be around.",
        image_1: "https://res.cloudinary.com/littleangelschildcare/image/upload/v1736751425/LittleAngels/philosophy-1.jpg",
        paragraph_2: "Our play-based childhood program teaches children to think creatively so they may succeed in our complex and ever-changing world. Purposeful play is developmentally appropriate and a significant element of any early childhood program.",
        paragraph_3: "Our program emphasizes the importance of play in a child's intellectual, social, emotional, and physical development. Play is a way of learning for children. During a typical day, structured and unstructured periods will enable children to learn at their own rate.",
        image_2: "https://res.cloudinary.com/littleangelschildcare/image/upload/v1736751425/LittleAngels/philosophy-2.jpg",
        paragraph_4: "We believe in the importance of Outdoors and Physical Activities for babies, and toddlers, and will encourage and motivate your child to Play and be active at Little Angels.",
        list_1: "Physical activities promotes healthy growth and development.\nIt helps build a healthier body composition, stronger bones and muscles.\nIt improves the child's cardiovascular fitness.\nIt helps in the development of better motor skills and in concentration and thinking skills.\nReduces children's risk of getting heart disease, cancer and type-2 diabetes later in life.",
        image_3: "https://res.cloudinary.com/littleangelschildcare/image/upload/v1736751424/LittleAngels/philosophy-3.jpg",
        paragraph_5: "Physical activity also boosts children's wellbeing. For example, active children are more likely to:",
        list_2: "be confident and feel like they belong\nbe relaxed and sleep well\nconcentrate better at school\nget along with others and make friends easily\nshare, take turns and cooperate."
      }}
    />
  );
};

export default PhilosophyCMS;
