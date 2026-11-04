import { ArrowRight, GraduationCap, MapPin, Sparkles, Wrench } from "lucide-react";
import PortfolioNav from "./PortfolioNav";


const journey = [
  {
    flag: "🇳🇵",
    title: "Nepal",
    copy: "Where my story, curiosity, and motivation to keep learning began.",
  },
  {
    flag: "🇺🇸",
    title: "University in the USA",
    copy: "Studying Computer Science while building hands-on experience in Applied Engineering.",
  },
  {
    flag: "⚙️",
    title: "Build & Experiment",
    copy: "Software, databases, digital logic, PLC automation, research, games, and web projects.",
  },
  {
    flag: "🚀",
    title: "2027 & Beyond",
    copy: "Internship experience, advanced coursework, graduation progress, and larger technical systems.",
  },
] as const;

const socials = [
  ["LinkedIn", "https://www.linkedin.com/in/arun-kumar-yadav-5a60373ab/"],
  ["Instagram", "https://www.instagram.com/ay.run_"],
  ["X", "https://x.com/aruny71582"],
  ["TikTok", "https://www.tiktok.com/@arunyadav999"],
] as const;

const focusItems = [
  ["01", "Software", "Building practical software and web experiences."],
  ["02", "Systems", "Computer architecture, operating systems, and digital logic."],
  ["03", "Automation", "PLC logic and hands-on engineering workflows."],
  ["04", "Research", "Exploring applied technology through academic research."],
] as const;

export default function Home() {
  return (
    <main id="top" className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="hero-shell relative isolate min-h-screen">
        <div className="aurora aurora-one" aria-hidden="true" />
        <div className="aurora aurora-two" aria-hidden="true" />

        <div className="mx-auto max-w-6xl px-4 pb-14 pt-4 sm:px-8 sm:pb-20 sm:pt-6 lg:pt-8">
          <header className="glass-nav inline-flex max-w-[calc(100%-4.6rem)] items-center gap-3 rounded-[1.25rem] px-3 py-2.5 sm:max-w-none sm:gap-4 sm:rounded-[1.4rem] sm:px-5 sm:py-3">
            <a href="/" className="brand-home-link" aria-label="Arun Learning Hub home">
              <img src="/arun-logo.svg" alt="Arun logo" className="brand-logo-full" />
              <span className="brand-name">Arun K. Yadav</span>
            </a>
          </header>

          <PortfolioNav />

          <div className="grid items-center gap-10 pb-10 pt-12 sm:gap-12 sm:pb-14 sm:pt-16 lg:min-h-[610px] lg:grid-cols-[1.08fr_.92fr] lg:gap-16 lg:pt-18">
            <div className="relative order-2 lg:order-1">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c83025]/20 bg-white/75 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#c83025] shadow-sm backdrop-blur sm:mb-6 sm:px-4 sm:text-[11px] sm:tracking-[0.16em]">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Computer Science • Applied Engineering
              </div>

              <h1 className="font-heading text-[clamp(2.6rem,7vw,5.4rem)] font-black leading-[0.94] tracking-[-0.06em] text-[#181818]">
                Building software, automation & engineering systems.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-7 sm:text-xl sm:leading-8">
                I&apos;m Arun K. Yadav, a Computer Science student combining software development with practical Applied Engineering experience.
              </p>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-4 sm:text-lg sm:leading-8">
                My work spans programming, databases, computer architecture, digital logic, PLC automation, research, and interactive projects.
              </p>

              <div className="mt-7 grid gap-2.5 text-sm text-muted-foreground sm:mt-9 sm:flex sm:flex-wrap sm:gap-3">
                <span className="mini-chip justify-start"><GraduationCap className="h-4 w-4" /> Computer Science</span>
                <span className="mini-chip justify-start"><Wrench className="h-4 w-4" /> Applied Engineering</span>
                <span className="mini-chip justify-start"><MapPin className="h-4 w-4" /> Nepal → USA</span>
              </div>

              <div className="mt-7 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap">
                <a href="/projects" className="primary-button justify-center">
                  View projects <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/resume" className="secondary-button justify-center">View resume</a>
              </div>
            </div>

            <div className="relative order-1 mx-auto w-full max-w-[430px] lg:order-2 lg:ml-auto">
              <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-[#c83025]/[0.07] blur-3xl" aria-hidden="true" />
              <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#faf9f5] p-2.5 shadow-[0_24px_70px_rgba(24,24,24,.13)] sm:rounded-[2.4rem] sm:p-3">
                <div className="overflow-hidden rounded-[1.55rem] sm:rounded-[1.95rem]">
                  <img
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHCAkIBgoJCAkMCwoMDxoRDw4ODx8WGBMaJSEnJiQhJCMpLjsyKSw4LCMkM0Y0OD0/QkNCKDFITUhATTtBQj//2wBDAQsMDA8NDx4RER4/KiQqPz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz//wgARCAFlAWgDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAAECAwQFBgf/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAB9DkguXSRA1JqJDi1KhoSkRAmLAsIgWIgSQiMbLAYlIIFhZXYp1Tm1ZbLIyVzTJQl0RhGrFGZXDSGSO+RzDqllhNZ1GMq5ZKCLJUSltIKJlUVvdDi90yLEqy1ZMepZHm5959Fp4m2XdLDGOkY7otsz32Qy6ctloyymFsZQtKlphoSJYrIkkIZYQlXz6wqdI4wCTU4CUpai5lTscsJTiUY3x+mVTGW811kbLdfOnHSrz61jvx1R6fR5302bnza8yWDNSom4CwJXxuqBYrICtyRrM74VYlSmyMmom6xbnncaHnkXOuyU5i4G8kazpiUyokqpkFZYtBKNl92Nxs9N5Hoy+mz215tgPWK5xdWCZfbntsnBRhTojnXTOaY3WXC0rREzZ9mNISr1FT0OXNK9kcPR8/qYqCHXCnCRKa3Y3HZo1cfTzL9qzrl8/0WfWPNR7HJ7+dXZ5ax6fd5v0mLaMua00TanUra7iFdufNSilsKhNozn0UZoox7cdVa8utJttYkgXB73Os8wivri/bt63D0crobJ8uuWy1TUK70Z4rNrNnF687nyEtGX0+TX63z/oYtGXNY2rnGdjtjbLTm2ZpYSsnZnLwER5dZJBDJrylOvLqLmnDTFimo8xy/b+V649FDoV+f1cnL0sO87N/H6mN25NnJlzWZYduPat53T59OLzfSz6+fQX0652gazBgsrKrLLbaLM6We7OWzqs1kAKHlu49bXBqZdWUr1ZdUWNMkmEFJSvk9Oqb1crq0468LH6KjrjD1odDn0fG7eaXh4+/HpjFsuniuFiZaou7cbQOnCImOcJLOdU8bjnuzl12W3pzuKQwX5zh1vs5u8vzX5rYbMeyLGmNNCAlo1U1c/XraczBSi0XUV2bK4ZLLrISlE1Dovy2WyT7+awDpxrakhOLWclLnurNqy6krIXdOdZMOTHHs8/Q3VK22rLJdOzDtluE5WmqiwhUaHjspRM7K5VrLn7qNKq5qtF2czNRCcrha9YVd1Ho8loGsxlF2NSIcoOaWbRnJX036zEmWeR6vI2cN78UKZbNUNSm7Dsa0SrlLIiWOIpWhqyccdI8/oYs9MNm1dLhdsr0yPoxzyvlXZhZpqu9HlzUX0a52iNZiKNXOuwunbPj15+fo4t4noq0byFpnXz/Rks5LnmsOm8dbW/Xy95rK4rc8xGmeXQ1ZKuRahZ3GtrHYrvic6eh6DlGRzqmm2yqfo8tOe+i5sTNSqMopOcLK0X4pY1bksz2X34rtZ2GYrxTtfm3XcXVKjfmVdTl9GXayd1VG9GeyU4rlMVOCmo1X0c+0VCGpIgrHKF8S0QnnWufM6Xq8lFF9FzaNWVxaslZXYNuctGbZjllfRp1iwkV5WGivx9Md2a7rNsLLZaL64nV0Ytjc0wjOLlk1yNTP6Xx/tNsFbfk9ddd7TAuhTpVfGUScLbk5vT8l7PH6+rj9bK9BZWmklOt1bPIs6vySrLr6JaxcYQ5kKl5tw2ZNu70rJTmufn3Z7NevLsaalni2HH53TPS5sJdMr33z32suG3VzfL6tDU8bhXdAipVJDrcb0vfjwfM9njd+Er84dzoeUknqY8boRrQ4qquozQiGmWafTCIhxZTv49Muq21d01KXPXLFqbVxqdzfghHUGCSFBT1Hlu/HpuD3aufXkzot8/psgCQovrs3dMXq8vjObryaxJwkNKJZOtmzo8OR6WHA1R066rc2ucLrEWlmc25+PWyzHg3OrzsUN5shCOpOKUCBYuSJRAfa4vVPYOrFjSq3x5dsJKPLtXujo7cLZcnf15eJocdYAFhJg3FkhNJOAWSqDZu41p3wInnsOXTg0lfbnOMQYgYhWhEhAwB7MV56jROzG5OM0x0dJcu6JQ68c+Xpc1PJNPeQAE0EotG0lYmjEhzgz0RiJOlk2YMdONBx6ZBOGBYKSVDSDjNUANxZ7y/n7pppuBTIrbKq53Q51nkwLkaAjKKyE0ASsBBCJShMvKw9N5/t+bxqtSjqABITpgAmkTErABoPXdXg96VoctjArUo2Vcnr8M84CsYCRaajQjQDTQISylCSWEQ7PF387NSaoQEyLqQmCYhFoYmAC9r1HjPZSyAluY0rrsrqPnPR+WOQmrkBClGQ0ACBiBEXE5QlTAL8064QCpNBOqwkBYNAACcWNAW+8+f+3l2OMltcSFVOujx/r/EJnQrBNDAAQMQNAVyhKWUoyRiLaUGSABADAYAAAAAAAB1ANABIAUQDjARABAMAQAwAQEWAwAAP/8QAKxAAAgEEAQMDBAIDAQAAAAAAAAECAxAREiAEITEFEzAVIkBBIzIkMzRC/9oACAEBAAEFApSH82DHxYMGBE7u2TJkzy1ZkzbJkz88mkKXwz+HBoaHtmhpyyZ+aU81IpTISUTMjLM8ET8XdkjBGIompgwY+DJm2TJkyZvk2JVcE+oFVeu5RqRie82b4N2xTaE82RPwruytEXwMZkzywY4NlSeqqTbee0ZYm/MWkRmZke5UI13EpV0xPIifhcVaPLBkbGxvhgwYMGODK9VQTnkzgySXfNkxTI1MGYuM44OmraP9T8LirR4wtsbGfkyV+pjFSk5tsxfCGrZtt2jVaijpZ5hMXFWjd2hIUjBgwYvkybGxkzfqK+FJ9/NvCZg1Zhnts1srJ4KFXE87QXFWV3wwYMGBjZm+Lo6qphNsbMisllqme2Kke2TpE6WBrF4tI6Seaa4qyu/gaJiIowYMGLde37jJXRQhkUO+pqYtKBUpdpLFvB009ai4qysx/AyQhcvUUI8EIOZHpmyHSIjSwaGDBqaGpKJ1NLsvPkiiPFWVmMwYMcZEhEeXWw3oDOjp5pqIkZXBvBLqIIfVwFXiySU41oaSOkpbNX/YrKzP2ubJCI8+roOnI6eOlB7yco1jWoU3JCeVkqZZKCIUqYoQFDD9QiUKbqTjTjSpqzF5FZWZ+1zZIRHnVjvTcPu1+2UlFSqZUqhCoyn3TiVWfv3iM+9N5XV096Pp9PWhIV/2Kysz9q+eDJCF8Fan/OytnLgp0qdN+5j7qC7NFan3j9iVHEpQ91wWp5FPWO2wr/sXBjFdO2bMkIXN+e7bNSURwI0iKtNDpntigYtjvT7NX/YuDGIyZImTYTtIRHm/90l3tgxaIxnh8JSxJeVf9i4MflXh4kxS7xtIRHn/AO3Nyd2yn/afU04z2yVOojCWylBcKi2ce0Vf93VmPyrxl2l3IREOQ2IjzZGOHF5jfA4y22wmQXBEf74wldeeLH5V4SF3EiUsGwmRI/B+o+LZwZbJNDwbIWBT72QoskK6suDGRtgp+YDkTkIREj8MVi9aWoq7mYqDVU1myW8Sm5OVo/2ZLgrK0YGhJDIoSMC7OMiUjyQiYER+SqsiprDiOySHEVqdpckftWmMiK6GRIschSIsybGxsZuuUxoipGOFPwS5K0Zm6JMYmJmbJjZFmxsRI2xdCuhmb5HLBsbDZkRD+pK7uuDJMTEZtg1Io1GiBAwYNTUxxZIybDkMbNjJG0PDJC4rgyREVsGLQtIiU2LlgwVJqnCGfaY0NGDBgwRQrVpew85UhcVZWkSIiEYJGSLM3gyL+Dqqnu1ayxdrI4jyYEhX9QX+F0nU4UhcVbJkkyREybCJj8xIxNRoRAXLqa+Sl36mv/rXDHGl99X1L/kRR6jUi88VbJszIxDGzJJ2pohEcSaEu8BcJTjA6jqdrReKqeRr26vOTwdJDFL1SX8VqdSUHT6tEZxndDHbNlZmb0iHhkkY7wFapVhAqdVJjk3dnTT2pdXDaEZcmRj7lTweqS/m4Rk0Q6iSI1oSFZjumZMjRgwQIeGNGouw+ojEqdTOQ3xZ6e89OirD26qMmRuzOjgM6956rkmQqyiQ6lMTUh2d8El3jE0IxI2lOMSXUEqjZm6u3b019kdRT9ynHgyMXOajrGXjqv8ApvnBtnhkTI1pIjXizKdlaUBISME68YE68pGTPFtoUuHpv+xEpqJUhl3ZCPswhPYl4r9699fhTFVZTqKVpK062hOtKRkyZ+P05/5E5qEVmTiThejH7pDypKptTk8z+am8TGxlR/dn5ujlr1PeUoLF6qw0QjqpGuSbcX86KbzTRUxGnL56LxXSMWROO0acNE2ebVP9f4HTT+2B1r+1/OvNPvHnI6jt034FN4cDrfL+L98ellnp+cjre3S/gLzE6ie9T8DoHnpbLzx9R/5/wc4py8/gemS+yy82Y7epv+P8GtLFF/g+myxWsv7WY7epv7vwa8h8V8C4dE8dVaP9rMdvUX/kfg1H93FfB+7wes1aPmzv1zz1X4Mvw6EtqIvNnZnUPPUfg+4zc3NzY2Njc3Nzc3Nzc3Nzc3Nyl6hUpQ+q1D6rUz9Xqn1eqfVqh9VqH1SoOq29zc3Njc3Nzc3Nzc3Mmxubm5//xAAlEQABAwMEAgIDAAAAAAAAAAABAAIRECAhAxIwMUBBE1AiYGH/2gAIAQMBAT8Bn6CfowJW3gJsjiGFuvNWtlBsKE5gKc3b4BozTEZQgVLgjDgiI8AhQi0IIqWhYPS1BnwNh7p8YQEULAVELaCcrVbtdYEeLsBChsHa1j+VgR4mH1ZCmkgJxkzfCFBc0zRv9WFFHmTbCNs3N7pNJo7u2bxazuyKO78FhzaTCPELd1AmGRZqH1yyptaYNjjJ45U8DXejTUd6R8UPwjnPGfHP65//xAAkEQABAwQDAAIDAQAAAAAAAAABAAIREBIgMCExQEFRAyJQYP/aAAgBAgEBPwED+BChQo8YGmFFSYV+gNwmpzPKszFSYRcpQfCa6fAO6OeZ4XJraUJadEKNAKlAlFBQ4oyEw8eC6genGaXoulAwmGRgUPEzrAoanVFDQCUBHgIoCFKJozrGShrOEUb1jbsI4wmg60zmBKeP1jECTSNFuQZ9qIRT2wcPxj5rCjTaSrMXCRUJogZQowDZQAGhzfqjB8oHVGmKFnK64Uam+dvnH+F//8QAMBAAAQICCQMEAgEFAAAAAAAAAQACESEQICIwMUBBUWESUHEDMjORE4FgQlJicqH/2gAIAQEABj8C/gM+2uI/pkoudAeVZdEeVgsB2ebgEYFOC3ROP6WsF7l7oqal2Q0TpxKiCpx+uyTxUTWwokiOgNO6Ev2oPwPYLM3KLipU41+kGR0Ul07Z6AvpIEGG6jnIVx5uiNs5DirNRN3HTONKgaJURJjcxpDc5LSdMbnWrPSZzsR7D/xQQXCkVOripzoiE1yDWrpbnSFaQFEsFKH3W9rvtQBn/a6g8TROpOflrRhHhH8jj+TlAltlWcKhG6xQL9NljQGMEDqjuM70oR0NWdSVZw7POqV1bjOgqW9bpLpqSAmfAUasBioZ4uEwgaklpTjVJ7LKawWCslQNSfY4qECFoPKwCmQFuVbHcI9nwWH8dn2MuKaXYuEbv0vVGDrLuwtY3CKF34IX434aHP8AQzDVen/sETtdcBHyKOl0wojN2iulmFDTsaCzTS5icXTQbuabJVsfSsnLzM1Zs1WnhdYxbcBu9DRxWnNbZPdbDiuOKIaaVz6h8Cg3EirclI3syrIUzcuHNEsRWgEANKHXeMVNSNxuVteOomutuBxq/wCRXND/ADfw1qQGKmb79LlRNERTHaiIUUfN+Dk2qJrTplkRQTkGHmrBRONR54yMKGjIg3PqeMm3xkWHi5dkyciODc/vJE8ZJ7eblg5yXnJOG4uWDJAZJn1cjgdkadjcu7Kw8XHqeclhkw0MaYL42L42L42L42L42L42L42ImFxhdf/EACgQAAIBBAICAQUBAQEBAAAAAAABERAhMUEgUWFxMIGRobHh8MHR8f/aAAgBAQABPxFSUIbk1VkEEEVIIIII4RwCCWFRDYoCLckNjHRpsmqTwEk/KlkMbx9LicrmsGAs0YybiY3cUidknShHikmpJJJJJJJJPB2Q5iyh4/oxbye73/4Nmp/TwE7VdXL/AP0POxJJJhQWaOiL0MucNBBA6STQhI+AIJiZYrjKPzK4pqFizMG3cyQ2/CcI/pIeM8NjW5shIuPTBgs2yhKS00xoZiGjIi9MX4Ukk0gaoYdCRMniJCRA7tKLtvSMKofbyICfLvJYx4g7E0Lo5+jOtXs/wGO9CHZeWlz5k8Y9oUsoS1DIQxq5FxR5EEiCKy6HwqOiQuIIIEjFm0HukOm9tiv9sg8IehdkSIP/AAyJ3kekvfa0OWM+wYrR8KyNc8E9CvIQJcSpFyBCLiCRA0MSRQMtiTpAkJURJJNWiyyHv+tDDMbLaQUnLZ6cE+H3G7ZDhyS6ExPd9xkZ2aDRG2Sfdy8fRgZCGbq3VIw2QO4jvgkIJjnmmTYRsCebyNtvBjGSPYPexJsgFMWJgcHgfoaEzZLlnJfwO3T6kUruhU2bqckkYbJJffEkIqFLIZIhiTpw5/cels7IE7djKSZLTBH7hJ0WrkXoTGCAPCdiaYx29IpQzZsz4WMNkkkEEDVJBL8jEoFFTFxmrWEmI6ESKk5D5bsItLC71GpsKawTYDHhoXQuxDXSszMQzZF6YpVD1kgggiutxbEEUggX53KINaHshrD+gwtfsdXZIleBpCZCLmOYxMnIIUWCz5IIHds0EM2NXpgQinMXJurkYcnv2cP8DOUQMMkAgjtKJTuqaFJLY7iTHS+wZ9DZENMt5DbIPKf8DMQxB5oVMCjQQggkknh5GAqxSJGtNyzDTTki7+i/JeEEJ/tEh3OfZDzkvhiPtGLMrXueS2hJHRu0QwYdiXC7uIC7ft0qoeaFw3wHy8jAXB0Sz2htvoJOgkXhYvCezsi5cz8Bh3polYZMSNuWbXhCRQw5gXqMzijwQRZYKdK5/BjQhiDzQhiRxviU+LmY8XRFu0tFlhJY76EYzJJLekMPMHLlaFnT1Y30LA5TWxbEnGHKyNRml2iTCjBLB3jXkShHYzaAzQoEnsMhDEHmpE0tccTpKJ0JmFOZjRcWnInEyJK791DkxryJnBuQgUIZJZiWF2QlCKRCUk22TIQxB1KvMeu5ZRMPFOZhzk0XaRBarSIhDEUJ3EIsWUKYPoNEU0Q7QkugZCGIOpIiqUgihGiYYjdhjP4EetIoLITwISbPt5E2Qg2lMelOfkgcW+g1huiHOuoLkXSoQ8CEC5tQ6VxcGhUJDMw52KeiXXgPJhNhsY7LoYpJ/YhWUEm7NosXkKUyakSSy3caMa2ZCHUVEyeCoZMhRERBzZIZGAuaSwMiG7DGjXNQT7CW7b1ItlozfqGIOxULuyPJjBkIZkTQxVZiCVDBrEZOTbFMjEXNEpuW5GqSBYP02RMwk+Qy4Q/jIkIuVHgE5QMWKLKVVkQzIbvS8kmRrFiES/CbA6hlQSJGQ5JJJI3VCGPBboh4IvQl7Owr7IQhOVQhch0rIhiySOLExoljKsh5HhDmZAqFwsmNKrU6kPIxqRCNqyGyZQTDkQj9o6VkQzdM6RK9Cce9YVNkloSSG8j3phjYhlx2MSJjGdEiagdtIoEKFh2pNjiyKjfCiRi5SYQdCF0wI2ZC2EHSYRSohGCosyKJIMQ4E2ybwIwsF9bkIZvlYa9RIZsEZEKBbiRQerIEqEMXa12JN8yup1RJRb9k9tD8iLIRKOTsye+iCGnKeHTkIZumdUCGXCKQkDi6atHcRA6SdGIVMInliXtsU0MKwxqgdoQpm6aRRZFpfOIFv6FOQhm6ZkiqDXpUK2AgVj4piHvwnRUlyeTsyX+mJKHkNKlOthqNKslol2Me0TQPVP6X0ISSU9qjN0yGxsqTmXOlh6FaSIi5OWOAFROCCUoajs7PbJPHaxS+GOdYX9BOVSCTLoyEQZD6/a4cDFofIRWWb4hujY44FLBuTZY+ALOF/D5FstfkujbbYjVHm9CN/iFoVGiBjnQ7X9CsSWESailxaWZnkPJnHLyN0MQUgbq2LwqK3QtQY7BXa4mVPgDWZdEOiMdmi9Q8Ma7dcNYVQbsOR9wMD0BLixMgwNfwFuT2QmlT9CEVqoTKiNliGd8dI1/cGYMNjZ24n32puqblTFIEhC1uFIUJDKPPtrI1yL0JcEGp2Z0x5MJhjXyG6YLuCMnQoiKF9I3cOkMsSNjdGFroW7bG6tZ8IwEOz6LZ9Dogil9h0kLd4F2u3UzjSvPg0mZ+4lAuEkkjU7MWd7jnSo2L3A3ix0hl0JH8MTrsTt30Q+UNlvgQ00w1lDGSM/p7FsNIoaFO2SuTHtuKFxkkkTyeGHSYa5I7GJJq/hkftDT+WgSkSaNDCYkux5O7l4wcNYuLi8C5yLA9yS+C8m/oaWaJ5vl6qiaFYYn9tC//AIMvkPIahC/VxcX8DxW7fVEa+23Vv4FxaEfTkbyCkggglr2ZyRemJePPlv4HRExAhksNej+YzwUkkWTZA81N7cL88l8GxCHhGYjdFhVeBc2LHGL9iEqsEDzR3Y0R7Xi/iQhHqXELPwLMcZusj4dlTIwpB2P+OLz8KohE4uI8/A8zwR/pWKIv+kggyr+lm+S+FURIgy4PBh8GHD29hGjNXKqZHTwbsKkk8XRE0mbll8jx6Ma0mqM1bp6HC/HB/DsRIqNLHx2Lm+PmBeTRgTTz4LPwPBuiq2aEukS6RLpE+kT6JEukT6RPpE+kT6RPpE+kS6QmWkT6RLpE+kLKGDcn+5iXL9x/iZ/iY2/2En+w3/0HMSW5J9In0ifSJ9E+kT6RLol0JdIl0iXSJdKmXRLpEuiXSP/aAAwDAQACAAMAAAAQacb28L93X23+OxxMFGIsEeN5SZs7kHP3VqIgPBfPDkvV2wQqJbSRazku9PB65DU/jw4TM0RX4dpz7T7j6ZPyqJgB5bOBEU3LOqMBsDIkxQIW3PZp3+PPT0H84dkg/qeeqzDBWNplNBxUA8HMN86+9iFgS7BSJKxNAt0MH9RVXjo5aowHOhbgI4COqVshJdJI6O635+eN+7i+VhPf5sIe85T6F0mPY2FAN7GS+9RMuMq9JUHVpvYAkaNlJkzEwGbE5lXxdzM3GrhN3Y75jbBNiPEe0I/l3FolPGAUgJ8tS/Mw6X92JGKAa30oZLudrxI5zCrsNUY6dNptRWDpimFaeG718hoVlcC3ObSER5Jf/wC9y0SuTDII5U8sPJI+OgQD3hNmx95wCT//AFzgQBgpvY7u47K+bsPMNFxpXy1DxAAPFq1sNZmbO3843bpyZdjwyF4bEX4OKd90R0+db5QhM+1R76vnpf8ApTppHBzbyyu1r7Nd3ZnB/HpBNNZ+j8i8cee++Ciid9ceCeC+Cec++//EAB8RAAMBAAMBAAMBAAAAAAAAAAABERAgITEwQEFRcf/aAAgBAwEBPxB1yhObH5ypfjRhspcY/MWMpSi5TGy4melaLR+ZSjYyiEk5/wAc8I2Jn4NQpR+YxDINVP8AJOTdax4LCVYD2xvrhCcXwTrGEYTyRSiXrFiGNGPzjSl4LFnaKlBF+i9dHgbXYoUQsePITrbqxZ1IJdDc63gfZ6yEvgaIKgsYhBOh4vBPFwT63810H1jJ9FChiG6G29C6RRE3rC9hYVvwbHT0Y3G2y8EMXChhsQRdTadQ/wBDVQk6DSodO0byXjEJIdMqxYTyie1xVlunuPHieD74tcCKN5Gh1HYmYlD314ljxroRGeC1uErexZA2NXdYhYyFPWMRYP8AgbvA1LmesQhjWQSxohv+jt+6vc5PG4ig+VxkINENnzSPMIdkifJufG4td/Rm1Dfy8/Faz9fFof4rg/Pk3X8Vwfn4a4P8SlL8/wD/xAAeEQEBAQEAAwEBAQEAAAAAAAABABEQICExMEFRcf/aAAgBAgEBPxDHx23wzwI7nhj14+AQ2I+1qxIjux+tnMskGzI+89uA5g3jbbfHb22c2QW7ZCPvCeMAZf8AXg8yOvTGzstmgHie/DbfJ684MiL9myyG+EtTCJpP3hzLPIfDc93o7LPls+2lsHpv6L4Y+8Jth9+T4AHIcbEy0W57IR8mjj1J7OEyyWsFlsO8fBMXobZvGPkeCYawxjmXzj4D3sxwEOIPVkzhNnBtIlhnxy+R6b+CwQp8iGUeEztLeYxJzfH54WzAy+McOI2PXTmeOTe8MZepFuxw9OLw4e0fJYnrrL4ndmYCAzLQ8JnhbHtJ6ggmBfksAMPEGeGQ2iZgh62RAB9gD0dfZzs4NcsA7vH3P+ZRHFn9nib5LlorG9c29dzxQ4bfyEj6/IAYvT8W+vxeb7yD8z/fxfA+/kcPxfA/U8nwPy22221tbW1tbfDbW1tbW1tea23/xAAnEAEAAgICAgIBBQEBAQAAAAABABEhMRBBUWFxgZEgobHB0eHw8f/aAAgBAQABPxBywrLX9DHXBVSoI/ocj4fp7CVKiRjLgZSgmbDmBjgSpZRKliWdxHvmV8TpGLNRvH9SNJcuL5mJRKJglExFJcWC020BtZTq2lmBT0oDCBNOZjizhl5mcbeA1NZvMIwxdIV1OihsEPWB2QLqADUzLYqR42DKHE8v5wkkEuOZURkZhyA6WJ7p3/iOMvbYdqr+yNaoIdt6V78SwtCWFf5HCKO9X+IUQKlovTwYRcVxu4iDEGeb3wGrIPiUgfEoSkScWkvGNI/pKM3uCiRYkRYqJUuKP/b6IYq51/gwTtCCPjMuWwjpm2oUW1GisHmvMP2cI5N9esbWHQRp2w/93BCk6tC/p3BFrYsD+IVRgtb+cMwIJbc0zfFcC5ggjRDbGk0oiKl/oDmawuNDxPCsFFUlLBMOCsKS8pQUXxV7ZnGRum38Xgx/4jJbVhZH3BdKzzCDqKv3LorA1EKE+aWaKitZfuQIb+c2xWXkagPupfxQrZH0v8SlVpxtU8nf1mbgkoM3w8GkuglkgbxqjS0w3LhnqFd2qBW4XmF5l0SwFixoWhBIOJxdDoLffqUXYN0+311XdS/1uP5f6lxVSZ9+qmilh3qZJ+SKFbeYl3Q+lh5BvyhFuoTbef2hw6jLlHx1Kc5AN2r8d/1FwAuzd9n/AL1EcFQRQjAnrphBGksmZzBMRgZzJx4+RUTaErYUVUx7iu4wFsIOBKCIgJSAlwiZQfLUUn7A/cf6I3RWX+iWYpMbhZD6I4rBIpw0u7r/AFDMVfpiZ1Pww3KtdPcEHR9RRvIkxByYirU62r6YeYpaWWD8f+uHQBFXeXX02fRHmUwQIMcTcpcqKVL5eeYKKF05seuDCVUp5ifM+UPaHvAMvgCyyy4u0DJ+YTIvzxCiYGvcLoC1uU6lb9eiOotXb5hiiV8D9SoS8xTK+I2ZYmCXFpTFGpYWqxleMsiuJvxiVS+Hi/5nVUau69TeCOuNw8xc895vaY6t+YT8Z8JjKiMoNxyIgTCywRHZXjBzfxnqWDz7gJb+IwCACNzfUUgOjH3HPNjMrpM5KNX1FF7wAUL6xP8AEZcULqIrWuo2lUOyUZQsV0epStr4htuqarv+ptw0jKwmFb4Ew4M3L8f0bieC+LTUB4lJXxAwRcSCqIWQVsOYtmQxU815qCbA3BGMS/mBdjozXUZTYbqOl5eok6MRJm8whhfWSKrsU4YCHTTEPc7jv2u46qLFqo6NGKnQwQIMRJYBuMGAqDEoYrFTqL8cjDBxDvmwghJSUqGBMHyVEBEp+DGkdduyOvQbYgwCjdG5QKBwgolcDR8TtW55pQiKXaIZFghxmPYrHMwLhZwFe3cAA0HevB+8tVt1BNYF8QMw4RhNIHGMxXiPpOuL4aM3hxmiBKlSuFgrWhutMIqr5ReRx3cIXLNgHNH9wpTUUiJ9sTWCOql0V3LGFwg9x0rVWSFtCu3BhocH8y1gVWRvHdMKItZexQkNHhe9fXJPAIOYMQQwgVL5GJqMsPAs15OjgSsRhIjB1HSt4M28Pq4zyoVZiqxmABsKX1T0MY/WrtyPcHV1FN6+ZpFPuNEjqKYAHlhlDLbUUtfItSjEEyW/si0Gz7bhSJqQaJWYOV7Ta+5tNZpwOHngoOJpFKzLixRcwnUyIYbgcBLjMYMF67w+eoJHkbV0jUA8xMfUaKAd+JYNt3/vM0/kmzMiJ0xJNmZfKhmVRBplRo20bfRLoY8lH8RGr+abD09zdy7UQzhg9aZjYU+jCG1DmaQ4/RVcBjMPGdsNRI2lkIQ4/QIhCPAIpaQKR93T/UWQdR4sn1X5fiZf8IQA/BnzAnBLlp19xSxL4Ux8MzVUnFwWiZjfXbNXUYkKKlh93FLLGEur1cAWYHKfe4oA8gszJNGmD6BcMtej+4alkqpWeDSacTjNlx5mkWOT4JcucZFkz5E8hGMqG1tAYla4FK5T3MnERE3LTKvmKws+pmAUaPMAwhxKyEEvF7JRgT2Qr/sErwSjUd0F0nUHsE8jWKHnmoOIsRTlhTjcDGqGe+A4eIuIEIRjjip9Agk5ouoc5j0S59TaqBU/adqUSxiG53Onh28yh0iTqLinB4gXhHQWgUfULqBfzDwa8G83hmXE0h5BwioyjM1FrI8IRtLprmkIQix4cf0/gxB0A/mbMxi4sAGokvkMXDZQNJSfNGJVFFYjhm7h2J8mFVzhsUxUXOgjlggD+EOiUqDkVNuUbhyhpg5ixFxFfE7qCyEhAzHOIwGVcKquCo+EQ4Y74Whdrr13ECkLFu4Y4lbR2cg7fUYvYFXGbUXPbFyRevmVQid1Z+8eizMl6/EVDqNpcytYN1feQSPPkaw5RMwYjhlUyIsRxuTSKOBcVEAwEzO04Twiw4HDE4YClK2zCsCN8BwxbM0aAbuKvyvBG5deGDGtV+rkgvZ2uoRot1D8JSvUqYj4PLsMqVaORpN8cuAzwGPHCikWpdJVSGC4AaYujM1EKlgRYcDhjFi4icg7lxMPepmldzJho6CNpwyGKPnxKZ+eD+0rCobvcpX8uJVkulpC1A2g3BZLhqvEqnRlmkOOLWaxZ8BW8FEWw1kxd9cPIQGHEFAEatwXPNXAKElRCkJDKwZcuG4Km8sUu6nnBeSE0kMM0VHyiZKD2QjDXzdzbZXthks9R0F+IrJZd8EOIccGseIs45TJGZNXK0qBZDtCE0IyUSK4qZaRiIEMtXLppGYeaNe5b3PnCzuWEGKLEzVxuYaurYkwRTY/BC5Xv1Ky1UKUiVMmZSo5tqHiavK1l5R3wXmABNhhlLHBqZrzMW4rcpyl6iMJDARNbjotgUIVTwolMCWMzBCnBkmqvEbNOGOJXc9/iDobhLzmDlinNkwnfx1DSyrf3gRSyy2jo/LxYHgygxKyjubSsxVCkw8iWNDTBMZbZeCJOFvAYSIUBIjxClDHCVwt1PuQWNbI5oJfXcZYoINIt/Mp4fTLwjDu5XAS8O3EzCijk8cNYuDWdo7m0IRlRLOEXx2sKMykpKkE4S0MxhLCEqCAuYZTgRnDjsuiWcPztWD0FQX8y4kpxkfUt4/KZ1QeoS0v6IMo37gdPxMl1BNR6mIug2vkL/ERGEIaR1NXh0msN5eeAgICtQqZjzUVK1xDFomcbiuECsw0TtJaEuODBNIEsRWgLVgXwQ+wCwmOGvwamUsZaM4/mBJEtY+CZJfCFO5m8w2CC/YH5p/mFVAw/wCx9RYw3xLEzI7xI4aMq7gKgU5lkLUCKHcNEJaNDkKiBcv4jmIEInE1gYggZ4GoSXzr/YepVejZ+EUhb09hv9oJWByJ3EKzLz6hbczWrly6gLqDRmY5hR2G/wDg/P8AEqB2H7xUUxoWlMv/AD6hYesljCaR3jmY8LSSiMMxUQ0RAxHoEFBteATEGuIAamVlImEmIlRJWZ6qEXL9Szt8N+D0QoXfU/8AlJJGQ5CWZWW+2vxqFYSszSKLHUW7FBArccNW4hGmtfQ6PxKDORXwD/sHxBQlqUuzY/Up7zvV+JefVjn8RwuBngpWwtLwhVLiGxXaKIFwqRgEQ4ly3BQdBMiVBUB+W/8AJd0eXf5RF74Lc2VzccKd6lEN5HzUod3Nd9v9iIIxIUks6jR9TCU3EPvoPDLACKCgiXWVT2v/ACDn1L42YaTUEKCeGIh6LP8AeVgz9ZH5hOUI9kFk2ReoKUSuNzcumjLzUUNy+WBDiWMzXUQbQB2srt/GNH5gw3PQfbtjlrFri2wRYivUK0yr+b/uUfOFIwFFZj14+phVGMSmrlxQcDeRQDOx47f/AHiKkyu3daa1BuXjgU/MQdxclLI4fhAbK+Y/EoD/AGmeOEOIOcQLLJENWVFkSmpWYhpJmR1pR7GY0J7yZekY7lZ5ZZBhXxDzBljRqdR8zAAfJ/yDTLix976+4lM7MNwwgN5jaFA38rfg7YX6kCOk9S3uaB+0pg5hZm6hAWJPLwMGIdy3MPkZVjQ6zgFP5jJLkX8pVQICoGUBQqDAc2gO4mX0LH5l2N31xu2JGnfAkNz8MDFRWeDFSjBNwnzdv3YcJXbJo7hjUyCbefuOM9ogZ1C4LVnzuLNOj/ZpoDPlP2cMLVEuJLxFZDAdYpc6lwggx3BShKpQh3GtKC68zRBCIEYLO29EYpK4wEud5jvcbcFFjcBcEoDOZQaA4Ny5brV/7JNuA+dilnIZUbfLM6cQdPsgpzPyhA7Rh7ahrVv3LkkWJNHmV8RLW7n7/oqK8MVkPUvi84ntCGP30cx0P+yxBNStiIXpqO27VmQfpjLFy4oRl0nuXDLxcMEwettHnDGztfgPBFcHIw+ohh9zJmxP7iGBV0HceimwHUSM/iEtYhgqDqdlZIrLvfJV5jFSe5pUGpcuyXLxBlPMeHudmZntqP1PLGg1VD2sv2LaIYy5eZqMupc1l2EGanuXiWho/kr+4wGpjLiWtXmAZg5XhgmpR9ep7gNwly9IS4lSOl/ZgoOO51GdCEHi/E3Cam2DioYlz+9nxNSPrTH1j+5iVLzNIl55qMI+I8U9Q1HgZR+wH1B6gh9lzMjSZtjAI49o3krfcc1wMRV84f8A214gc3iO45fggQicEuLFdEG2DEW82MoCVuDCo+5fF9xZGXmGIcMqMMfKGp7jwZYksiF/GP6g4JILBHGXeoByah0JUdtQB/8A0Cd8Vxpnl5g8LUuEuLFsHgm0eJ8iTUsvZg/AGomblzJRWEIT1KiVPmHEdhjNzTCH/wDdu/7gVKAlk+AuVfvqW6qHP5i0TMlP438W83w8fMMGIZ574Xg28FUeY2jsf2mSqMYTBH3BhDfDwmI6XC88EJTZv2V/UGLjEpQfDL0bgwZzBSsT3Gv4/wCovBGZE8fp74dxZpCKOpRDlB9bimZcMzAP1Cq4Hi884jwg3+hcri4+Uf7Dg7SsH9pWAILU0miW+P8Avg/qM1wwbV5LLlxixdwwTKGuFVaC37juOuHEyUVjgnqO5cuJZkn5DhhLddDL7E/mo8TSYcnk5xUySOpmX/UryuJQmDFdQlDufBlsLvLG9XOoswzFULQZiHWPxFiy4y4qRwYl/p18uL4UHD+EYCRpyRyCYfSYS48rFuHBNvx+1EYsZkhD5lTTLzDh3FxF5ClyxfLFbyxl0WKXxcvhmuNwbLncvMMnuZPte/NQbY6F+JeNSu4ss2WOnF8j+01FjHUyTPia4+ZZ8zL6nXuLKDbg+ILhgg5imf3IvzMDK9CKdEB/WMzNzLyErmbg5Ecmk2q76Yf9D/cpjRq/9wH/AE/3P/p/7l1g+/8Ac/0D/cN1ff8AuFUKW9rf6GZgjSEZWVrpKH/T9HdyhIQ6IF0gJL0oA3L/2Q=="
                    alt="Professional portrait of Arun K. Yadav"
                    width="720"
                    height="714"
                    loading="eager"
                    decoding="async"
                    className="block aspect-square w-full object-cover object-center"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 px-3 pb-2 pt-4 sm:px-4">
                  <div>
                    <p className="font-black text-[#181818]">Arun K. Yadav</p>
                    <p className="mt-0.5 text-xs font-semibold text-muted-foreground">Computer Science • Applied Engineering</p>
                  </div>
                  <span className="rounded-full border border-[#c83025]/20 bg-[#c83025]/[0.06] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-[#c83025]">Portfolio</span>
                </div>
              </div>
            </div>
          </div>

          <section className="pb-16 pt-4 sm:pb-20 sm:pt-8">
            <div className="rounded-[1.7rem] border border-black/10 bg-white/75 p-5 shadow-[0_14px_45px_rgba(24,24,24,.06)] backdrop-blur sm:rounded-[2rem] sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
                <div>
                  <p className="section-kicker">MY FOCUS</p>
                  <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] sm:text-4xl">Learn. Build. Test. Improve.</h2>
                </div>
                <p className="max-w-3xl text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  I enjoy turning coursework and ideas into real projects that I can test, improve, and share. Each area of the portfolio opens as its own focused page.
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {focusItems.map(([number, title, copy]) => (
                  <article key={title} className="rounded-2xl border border-black/10 bg-[#faf9f5] p-4 transition hover:-translate-y-1 hover:border-[#c83025]/30 hover:shadow-[0_14px_35px_rgba(24,24,24,.07)]">
                    <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#c83025]">{number}</span>
                    <h3 className="mt-2 font-black text-[#181818]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="journey" className="pb-16 pt-2 sm:pb-24 sm:pt-6">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:gap-8">
              <div>
                <p className="section-kicker">MY JOURNEY</p>
                <h2 className="section-title mt-2 font-heading sm:mt-3">From Nepal to the United States.</h2>
              </div>
              <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                My path is still in progress. Each step has added new skills, new challenges, and a stronger interest in building useful technology.
              </p>
            </div>

            <div className="relative mt-8 grid gap-3.5 sm:mt-12 sm:gap-5 md:grid-cols-2">
              <div className="absolute left-1/2 top-6 hidden h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-gradient-to-b from-[#c83025]/30 via-[#c83025]/10 to-transparent md:block" aria-hidden="true" />
              {journey.map((item, index) => (
                <article key={item.title} className="group relative overflow-hidden rounded-[1.35rem] border border-black/10 bg-white/75 p-4 shadow-[0_8px_28px_rgba(24,24,24,.05)] transition hover:-translate-y-1 hover:border-[#c83025]/30 hover:shadow-[0_18px_45px_rgba(24,24,24,.08)] sm:rounded-[1.6rem] sm:p-6">
                  <div className="absolute right-4 top-3 text-4xl font-black text-[#c83025]/[0.06] sm:right-5 sm:top-4 sm:text-5xl">0{index + 1}</div>
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#c83025]/15 bg-[#c83025]/[0.06] text-2xl sm:h-14 sm:w-14 sm:rounded-2xl sm:text-3xl" aria-hidden="true">{item.flag}</span>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#c83025] sm:text-[10px] sm:tracking-[0.16em]">Step 0{index + 1}</p>
                      <h3 className="mt-1.5 text-lg font-black sm:mt-2 sm:text-xl">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground sm:mt-3 sm:text-base sm:leading-7">{item.copy}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="social-media" className="border-t border-black/10 py-9 sm:py-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <div>
                <p className="section-kicker">SOCIAL MEDIA</p>
                <h2 className="mt-2 text-xl font-black tracking-[-0.03em] sm:mt-3 sm:text-2xl">Connect with me online.</h2>
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
                {socials.map(([name, href]) => (
                  <a key={name} href={href} target="_blank" rel="noreferrer" className="secondary-button justify-center px-3 py-2.5 text-sm">
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </section>

          <footer className="border-t border-black/10 py-6 text-sm text-muted-foreground sm:py-8">
            <div className="flex flex-col gap-2 text-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:text-left">
              <span>© 2026 Arun K. Yadav</span>
              <span>Computer Science • Applied Engineering</span>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
