// 滾動 header顯示
let prevY = 0;
$(document).on("scroll", function () {
    let currentY = $(this).scrollTop();
    if (currentY > prevY) {
        $("header").addClass("scroll-down");
        $(".navbar").find("button").addClass("scroll-down");
    }
    if (currentY === 0) {
        $("header").removeClass("scroll-down");
        $(".navbar").find("button").removeClass("scroll-down");
    }
    prevY = currentY;
});

// 輪播照片
let heroN = 0;
function heroCarousel() {
    cardLength = $("#hero .carousel .img-box").length;
    $("#hero .carousel .img-box").css("opacity", "0");
    heroN = (heroN + 1) % cardLength;
    $(
        `#hero .carousel .img-box:nth-child(${
            heroN === 0 ? cardLength : heroN
        })`
    ).css("opacity", "1");
}
setInterval(heroCarousel, 2500);

//文字動畫
$("#hero-text h1").each(function () {
    const text = $(this).text();
    $(this).html("");

    for (let char of text) {
        if (char === " ") {
            $(this).append("<span>&nbsp;</span>");
        } else {
            $(this).append(`<span>${char}</span>`);
        }
    }
});
const tl = gsap.timeline();
$("#hero-text h1").each(function () {
    const spans = $(this).find("span");
    tl.to(
        spans,
        {
            duration: 0.04,
            opacity: 1,
            stagger: 0.04,
            ease: "power1.inOut",
        },
        "+=0.5"
    );
});
tl.call(() => {
    const lastH1 = $("#hero-text h1").last();
    const lastSpan = lastH1.find("span").last();

    gsap.to(lastSpan, {
        y: -10,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
    });
});

// 向下按鈕
const windowHeight = window.innerHeight;
const buttons = [
    { selector: "#logo", scrollPosition: 0 },
    { selector: ".down-arrow", scrollPosition: windowHeight },
    { selector: "#btn-about", scrollPosition: windowHeight },
    { selector: "#btn-skill", scrollPosition: windowHeight * 2 },
    { selector: "#btn-experience", scrollPosition: windowHeight * 3 },
    { selector: "#btn-portfolio", scrollPosition: windowHeight * 4.25 },
];
buttons.forEach((button) => {
    $(button.selector).on("click", function () {
        $("html, body").animate({ scrollTop: button.scrollPosition }, 800);
    });
});

// 技能
const originSkillCards = $(".skill-card");
const firstSkillCard = originSkillCards.slice(0, 2).clone();
const lastSkillCard = originSkillCards.slice(-2).clone();
$(".skill-panel").prepend(lastSkillCard);
$(".skill-panel").append(firstSkillCard);

const totalSkillCards = originSkillCards.length;
const perSkillWidth = $(".skill-card").outerWidth(true);
const initialSkillX = -perSkillWidth * 2;
const transitionSkillTime = 500;

let skillN = 0;
function skillButtonClick(noTransition = false) {
    const nextX = initialSkillX - skillN * perSkillWidth;
    if (noTransition) {
        $(".skill-panel")
            .css("transition", "none")
            .css("transform", `translateX(${nextX}px)`);
    } else {
        $(".skill-panel")
            .css("transition", "")
            .css("transform", `translateX(${nextX}px)`);
    }
}
function skillOpacityChange() {
    $(".skill-full-card").css("opacity", "0").css("z-index", "0");
    $(`.skill-full-card:nth-child(${skillN + 1})`)
        .css("opacity", "1")
        .css("z-index", "2");
}

$(".skill-panel").css("transform", `translateX(${initialSkillX}px)`);
$("#skill-prev").on("click", function () {
    skillN--;
    skillButtonClick();
    skillOpacityChange();
    if (skillN < 0) {
        skillN = totalSkillCards - 1;
        skillOpacityChange();
        setTimeout(() => {
            skillButtonClick(true);
        }, transitionSkillTime);
    }
});
$("#skill-next").on("click", function () {
    skillN++;
    skillButtonClick();
    skillOpacityChange();
    if (skillN >= totalSkillCards) {
        skillN = 0;
        skillOpacityChange();
        setTimeout(() => {
            skillButtonClick(true);
        }, transitionSkillTime);
    }
});

// 切換工作經歷/學習歷程
$("#jobBtn").on("click", function () {
    $(this).addClass("active");
    $("#codeBtn").removeClass("active");
    $(".job").css("opacity", "1");
    $(".code").css("opacity", "0");
});
$("#codeBtn").on("click", function () {
    $(this).addClass("active");
    $("#jobBtn").removeClass("active");
    $(".code").css("opacity", "1");
    $(".job").css("opacity", "0");
});

$(".job-card").on("click", function () {
    $(this).find(".job-click-show").toggleClass("show");
});

// 作品集
const originPortfolioCards = $(".project-panel a");
const firstPortfolioCard = originPortfolioCards.slice(0, 3).clone();
const lastPortfolioCard = originPortfolioCards.slice(-3).clone();
$(".project-panel").prepend(lastPortfolioCard);
$(".project-panel").append(firstPortfolioCard);

const totalPortfolioCards = originPortfolioCards.length;
const perPortfolioWidth = $(".project-panel a").outerWidth(true);
const initialPortfolioX = -perPortfolioWidth * 3;
const transitionPortfolioTime = 500;

let portfolioN = 0;
function portfolioButtonClick(noTransition = false) {
    const nextX = initialPortfolioX - portfolioN * perPortfolioWidth;
    if (noTransition) {
        $(".project-panel")
            .css("transition", "none")
            .css("transform", `translateX(${nextX}px)`);
    } else {
        $(".project-panel")
            .css("transition", "")
            .css("transform", `translateX(${nextX}px)`);
    }
}

$(".project-panel").css("transform", `translateX(${initialPortfolioX}px)`);
$("#project-prev").on("click", function () {
    portfolioN--;
    portfolioButtonClick();
    if (portfolioN < 0) {
        portfolioN = totalPortfolioCards - 1;
        setTimeout(() => {
            portfolioButtonClick(true);
        }, transitionPortfolioTime);
    }
});
$("#project-next").on("click", function () {
    portfolioN++;
    portfolioButtonClick();
    if (portfolioN >= totalPortfolioCards) {
        portfolioN = 0;
        setTimeout(() => {
            portfolioButtonClick(true);
        }, transitionPortfolioTime);
    }
});

const budda = `
                       _ooOoo_
                      o8888888o
                      88" . "88
                      (| -_- |)
                      O\\  =  /O
                   ____/\`---'\\____
                 .'  \\\\|     |//  \`.
                /  \\\\|||  :  |||//  \\
               /  _||||| -:- |||||_  \\
               |   | \\\\\\  -  /// |   |
               | \\_|  ''\\---/''  |   |
               \\  .-\\__  \`-\`  ___/-. /
             ___\`. .'  /--.--\\  \`. . __
          ."" '<  \`.___\\_<|>_/___.'  >'"".
         | | :  \`- \\\`.;\`\\ _ /\`;.\`/ - \` : | |
         \\  \\ \`-.   \\_ __\\ /__ _/   .-\` /  /
    ======\`-.____\`-.___\\_____/___.-\`____.-'======
                       \`=---='
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                  佛祖保佑       永無BUG
`;
console.log(budda);
