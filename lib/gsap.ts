import { gsap } from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText)
CustomEase.create("taut", "M0,0 C0.7,0 0.85,1 1,1")

export { gsap, ScrollTrigger, SplitText, CustomEase }
