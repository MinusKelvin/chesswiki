document.addEventListener("DOMContentLoaded", () => {
    let toc = document.getElementById("toc")
    let stack = [toc]
    for (const child of document.getElementById("content-div").children) {
        let match = child.tagName.match(/H(\d)/)
        if (match !== null) {
            let hnum = parseInt(match[1])
            while (stack.length > hnum) {
                stack.pop()
            }
            while (stack.length < hnum) {
                let block = document.createElement("ul")
                stack[stack.length-1].append(block)
                stack.push(block)
            }
            let link = document.createElement("a")
            link.href = "#" + child.id
            link.append(child.textContent)
            let li = document.createElement("li")
            li.append(link)
            stack[stack.length-1].append(li)
        }
    }

    document.querySelectorAll("a[href^='#']").forEach(link => {
        let href = link.getAttribute("href");
        if (href !== "#") {
            let target = document.querySelector(href)
            link.addEventListener("click", e => {
                e.preventDefault()
                let top = target.getBoundingClientRect().top + window.scrollY;
                let margin = parseInt(getComputedStyle(target).marginTop)
                window.scrollTo({
                    top: Math.round(top - margin),
                    behavior: "smooth",
                })
            })
        }
    })
})
