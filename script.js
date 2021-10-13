class Slider {
  constructor(selector) {
    this.selector = selector;
    this.animationActive = false;
    this.currentIndex = 0;
    this.marginLeft = 0;
  }

  init() {
    this.slider = document.querySelector(this.selector);
    this.wrapper = this.slider.querySelector(".slider__wrapper");
    this.arrowLeft = this.slider.querySelector(".slider__arrow-left");
    this.arrowRight = this.slider.querySelector(".slider__arrow-right");
    this.dots = this.slider.querySelectorAll(".dots i");
    this.slides = this.slider.querySelectorAll(".slider__slide");
    this.bindEvents();
    this.autoAnimation();
  }

  autoAnimation() {
    this.autoInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  bindEvents() {
    this.arrowRight.addEventListener("click", () => this.nextSlide());

    this.arrowLeft.addEventListener("click", () => {
      this.previousSlide();
    });

    this.slider.addEventListener("mouseover", () => {
      clearInterval(this.autoInterval);
    });

    this.slider.addEventListener("mouseleave", () => {
      this.autoAnimation();
    });

    this.dots.forEach((dot, i) => {
      dot.addEventListener("click", () => this.showImg(i));
    });
  }

  showImg(index) {
    let amount = index - this.currentIndex;
    if (amount > 0) {
      for (let i = 0; i < amount; i++) {
        this.wrapper.append(this.wrapper.firstElementChild);
      }
    } else {
      for (let i = amount; i < 0; i++) {
        this.wrapper.prepend(this.wrapper.lastElementChild);
      }
    }

    this.currentIndex = index;
    this.showActiveDot();
  }

  showActiveDot() {
    this.dots.forEach(() => {
      const allSelected = document.querySelectorAll(".dots i.active");
      allSelected.forEach((selected) => {
        selected.classList.remove("active");
      });
      this.dots[this.currentIndex].classList.add("active");
    });
  }

  previousSlide() {
    if (this.animationActive) return;

    this.wrapper.prepend(this.wrapper.lastElementChild);
    this.marginLeft = -100;
    this.draw();
    this.previousSlideAnimation();

    if (this.currentIndex === 0) {
      this.currentIndex = this.slides.length - 1;
    } else {
      this.currentIndex--;
    }

    this.showActiveDot();
  }

  nextSlide() {
    if (this.animationActive) return;

    this.nextSlideAnimation();

    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.showActiveDot();
  }

  nextSlideAnimation() {
    this.animationActive = true;
    requestAnimationFrame(() => {
      if (this.marginLeft > -100) {
        this.marginLeft -= Slider.STEP;
        this.draw();
        this.nextSlideAnimation();
      } else {
        this.wrapper.append(this.wrapper.firstElementChild);
        this.marginLeft = 0;
        this.wrapper.style.marginLeft = 0;
        this.animationActive = false;
        return;
      }
    });
  }

  draw() {
    this.wrapper.style.marginLeft = this.marginLeft + "%";
  }

  previousSlideAnimation() {
    this.animationActive = true;
    requestAnimationFrame(() => {
      if (this.marginLeft < 0) {
        this.marginLeft += Slider.STEP;
        this.draw();
        this.previousSlideAnimation();
      } else {
        this.animationActive = false;
      }
    });
  }
}
Slider.STEP = 1;

document.addEventListener("DOMContentLoaded", function () {
  let slider = new Slider(".slider");
  slider.init();
});
