import React from "react";
import Feature from "./Elements/Feature";

import cardReaderImage from "@assets/images/icons/file-text-dynamic-premium.png";
import sceneImage from "@assets/images/icons/scene.png";

import budgetsImage from "@assets/images/landing/budgets.png";
import mobileImage from "@assets/images/landing/mobile_mockup.png";
import rankImage from "@assets/images/landing/rank.png";

function Features() {
  return (
    <div>
      <Feature
        title="Scan and Go - Effortless expense tracking"
        text="Say goodbye to manual data entry. With neonFin's AI-powered receipt and barcode scanning feature, adding new purchases to your budget has never been easier. Simply scan the barcode of a product and it will be added. Saving you time and hassle."
        image={cardReaderImage}
      />
      <Feature
        reversedOrder
        title="Advanced Analytics in realtime"
        text="neonFin doesn't just scan your receipt - it understands what you actually buy. Track your expenses by category and see your spending habits over time. Various reports allow you to spot trends and identify areas where you can improve your finances."
        image={sceneImage}
      />
      <Feature
        title="Make Budgeting Fun with Gamified Budgeting"
        text="neonFin transforms budgeting into a game. Earn points and unlock levels as you stick to your budget. Compare your progress with friends and stay motivated to reach your financial goals."
        image={rankImage}
      />
      <Feature
        reversedOrder
        title="Stay on top of your finances and lifestyle with Budgets"
        text="neonFin provides you with the tools to not only track your expenses, but also make informed choices about your lifestyle. Create budgets for different aspects of your life such as CO2 emissions, average nutriscore, and more. With neonFin's detailed budgeting features, you can easily see how your spending aligns with your values and goals."
        image={budgetsImage}
      />
      <Feature
        title="Take neonFin with you wherever you go"
        text="With neonFin, you're never far from your budget. neonFin is optimized for both computers and mobile devices, so you can access your budget from anywhere, at any time. Plus, you can use neonFin even when you're offline! With our seamless synchronization feature, all your data will be updated and available on all your devices as soon as you are connected again."
        image={mobileImage}
      />
    </div>
  );
}

export default Features;
