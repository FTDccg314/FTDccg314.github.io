document.addEventListener("DOMContentLoaded", () => {
  // 添加技能进度条动画
  const skillItems = document.querySelectorAll(".skill-progress");
  skillItems.forEach((item) => {
    item.style.width = "0%";
    setTimeout(() => {
      item.style.transition = "width 1s ease-in-out";
      item.style.width = item.style.width;
    }, 100);
  });

  // 添加项目卡片hover效果
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseover", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
    });

    card.addEventListener("mouseout", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "none";
    });
  });

  // 添加统计数字计数动画
  const counts = document.querySelectorAll(".count");
  counts.forEach((count) => {
    const target = parseInt(count.textContent);
    let current = 0;
    const increment = target / 30;
    const updateCount = () => {
      if (current < target) {
        current += increment;
        count.textContent = Math.ceil(current) + "+";
        requestAnimationFrame(updateCount);
      }
    };
    updateCount();
  });

  // 添加主题切换功能
  const themeToggle = document.querySelector(".theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // 检查本地存储中的主题设置
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    document.body.setAttribute("data-theme", currentTheme);
  } else {
    // 如果没有存储的主题，则使用系统主题
    const theme = prefersDarkScheme.matches ? "dark" : "light";
    document.body.setAttribute("data-theme", theme);
  }

  // 主题切换事件处理
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // 添加切换动画效果
    document.body.style.opacity = "0";
    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 50);
  });

  // 监听系统主题变化
  prefersDarkScheme.addEventListener("change", (e) => {
    const theme = e.matches ? "dark" : "light";
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });

  // 添加时间显示功能
  function updateTime() {
    const now = new Date();

    const elements = {
      year: document.getElementById("countdown-year"),
      month: document.getElementById("countdown-month"),
      day: document.getElementById("countdown-day"),
      hour: document.getElementById("countdown-hour"),
      minute: document.getElementById("countdown-minute"),
      second: document.getElementById("countdown-second"),
    };

    // 添加动画效果
    function updateElement(element, value) {
      const formattedValue = value.toString().padStart(2, "0");
      if (element.textContent !== formattedValue) {
        element.classList.add("updating");
        element.textContent = formattedValue;
        setTimeout(() => {
          element.classList.remove("updating");
        }, 300);
      }
    }

    // 更新时间显示
    updateElement(elements.year, now.getFullYear());
    updateElement(elements.month, now.getMonth() + 1);
    updateElement(elements.day, now.getDate());
    updateElement(elements.hour, now.getHours());
    updateElement(elements.minute, now.getMinutes());
    updateElement(elements.second, now.getSeconds());
  }

  // 初始更新
  updateTime();

  // 每秒更新一次
  setInterval(updateTime, 1000);
});
