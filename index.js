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
let heroN = 1;
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

// 向下按鈕
const windowHeight = window.innerHeight;
$(".down-arrow").on("click", function () {
    $("html, body").animate({ scrollTop: windowHeight }, 800);
});
$("#btn-about").on("click", function () {
    $("html, body").animate({ scrollTop: windowHeight }, 800);
});
$("#btn-skill").on("click", function () {
    $("html, body").animate({ scrollTop: windowHeight * 2 }, 800);
});
$("#btn-experience").on("click", function () {
    $("html, body").animate({ scrollTop: windowHeight * 3 }, 800);
});
$("#btn-portfolio").on("click", function () {
    $("html, body").animate({ scrollTop: windowHeight * 4.25 }, 800);
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
    $(".skill-full-card").css("opacity", "0");
    $(`.skill-full-card:nth-child(${skillN + 1})`).css("opacity", "1");
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
