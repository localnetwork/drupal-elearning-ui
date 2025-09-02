const dotenv = require("dotenv");
const fs = require("fs");
const https = require("https");
const axios = require("axios").default;
const { Jsona } = require("jsona");
const dataFormatter = new Jsona();
module.exports.preBuildDevelopment = async () => {
  dotenv.config();
  // Convert the environment variables to a JSON object
  const envVars = {};
  for (const key in process.env) {
    envVars[key] = process.env[key];
  }

  const headers = {
    headers: {
      "x-rate-key": process.env.RATE_LIMIT_KEY,
    },
  };

  // Footer Data
  //   const footerHandler = await axios.get(
  //     envVars.NEXT_PUBLIC_TENANT_API +
  //       "/api/menus/footer?include=nodes.children,parentNodes"
  //   );
  //   const footer = dataFormatter.deserialize(footerHandler.data);

  // Generate default Image
  const generateImage = (imageUrl, path) => {
    const file = fs.createWriteStream(path);
    https.get(imageUrl, function (response) {
      file.on("finish", () => {
        file.close();
        console.log("Default Image Downloaded");
      });
    });
  };
  [].forEach((e, i) => {
    generateImage(e, `./public/image${i}.webp`);
  });

  //   fs.writeFileSync(
  //     "./lib/preBuildScripts/static/globalData.json",
  //     JSON.stringify({
  //       formSetting,
  //       tenantDetails,
  //       menus,
  //       footer,
  //       globalDetails,
  //       membersUpdateInfoForm,
  //       contactUsForm,
  //       reciprocalClubForm,
  //       loginForm,
  //       registerForm,
  //       // locales,
  //     })
  //   );

  console.log("New Global Data Generated!");
};
