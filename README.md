# oakenfull.com.au — Personal Developer Portfolio

Welcome to the source code for [oakenfull.com.au](https://oakenfull.com.au), a terminal-themed portfolio for Justin Oakenfull — Full-Stack Developer, open source contributor, and lifelong learner.

---

## 🖥️ Overview

This site emulates a classic terminal interface to present:

- **Professional profile** (`whoami`)
- **Skillset breakdown** (frontend, backend, databases, DevOps, tools)
- **Featured projects** with detailed tech stacks
- **Konami Mode** developer easter egg 🕹️
- **Dockerized services** powering Justin’s homelab
- **Contact and social links** via stylized bash script

All design and logic are built with HTML5, CSS3, and vanilla JavaScript — no frameworks or build tools.

---

## 🔍 Key Sections

#### 🧑‍💻 Home
```bash
$ whoami
Software Developer
```
Terminal output styled to showcase Justin's developer identity and motivation.

---

#### 📜 About

```js
const developer = {
  name: "Justin Oakenfull",
  role: "Full-Stack Developer",
  languages: [...],
  backend: [...],
  frontend: [...],
  devops: [...],
  tools: [...],
};
```

Syntax-highlighted JSON object presents skills as executable code.

---

#### 🚀 Projects

Showcases four key projects with dynamic layout and language icons:

| Project | Tech Stack | Summary |
|--------|------------|---------|
| **OreFox SDMS** | Django, Leaflet, PostgreSQL | Map-linked geodocument storage |
| **Portfolio Simulator** | Java, JavaFX | Stock trading simulation |
| **Orbit** | React Native | Family hub with gamified tasks |
| **Alzheimer’s Classifier** | ViT, PyTorch | ML model for dementia stage detection |

---

#### ⚙️ Services

Styled as a `docker-compose.yml`, this section showcases a small selection of self-hosted apps:

- **Speedtest Tracker**
- **Penpot**
- **Cloudflare DDNS Updater**

All with container commands and live links where applicable.

---

#### 📫 Contact

```bash
#!/bin/bash
# Let's connect and build something amazing together

echo "justin@oakenfull.com.au" | mail  
git clone github.com/justinoakenfull  
curl -X GET linkedin.com/in/justin-oakenfull  
```

---

## 🧩 Konami Mode

Entering the classic [Konami code](https://en.wikipedia.org/wiki/Konami_Code) reveals a hidden *"hacker"* panel with links to:

- GitHub profile  
- Email clipboard shortcut  

---

## 🔧 Project Structure

```
├── index.html          # Main terminal-themed portfolio page
├── home.css            # Styling for terminal UI and animations
├── home.js             # JavaScript for Konami code, typing effects
├── img/                # Favicon, background matrix assets, project icons
└── docker-compose.yml  # Used for service styling (not deployment)
```

---

## 🛠️ Contributing

While this is a personal site, contributions are welcome to improve:

- Accessibility  
- Performance  
- Mobile responsiveness  
- Easter eggs  

Fork the repo, create a branch, and submit a pull request.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 👋 Contact

Justin Oakenfull  
Email: justin@oakenfull.com.au  
Web: [oakenfull.com.au](https://oakenfull.com.au)  
LinkedIn: [linkedin.com/in/justin-oakenfull](https://linkedin.com/in/justin-oakenfull)  
GH: [github.com/justinoakenfull](https://github.com/justinoakenfull)
