// Medical Study Tracker Application with localStorage persistence

// --------------- Fill this out with your actual comprehensive subjects data ---------------- //
// For brevity, I'll use a tiny example. You MUST paste
// your complete 19-subjects database from earlier here instead!
const TOPICS_DB = {
    "Anatomy": {
        "categories": [
            {
                "name": "General Anatomy & Histology",
                "topics": ["Cell structure and function", "Tissues - Epithelial, Connective, Muscular, Nervous"]
            }
        ]
    },
    // ... Copy entire medical_subjects_database contents here! ...
};
// --------------- END of DB filler ------------------- //

class MedicalStudyTracker {
    constructor() {
        this.subjects = {};
        this.progress = {};
        this.currentSubject = null;
        this.searchResults = [];
        this.currentFilter = 'all';
        this.init();
    }

    // Initialize app: load data, progress, render UI
    async init() {
        await this.loadMedicalData();
        this.progress = this.loadProgress();
        this.renderSubjects();
        this.selectSubject(Object.keys(this.subjects)[0]);
    }

    loadMedicalData() {
        this.subjects = TOPICS_DB;
    }

    // --- LocalStorage ---
    loadProgress() {
        try {
            const progress = localStorage.getItem('studyProgress');
            return progress ? JSON.parse(progress) : {};
        } catch {
            return {};
        }
    }

    saveProgress() {
        localStorage.setItem('studyProgress', JSON.stringify(this.progress));
    }

    // --- UI Render/Update ---
    renderSubjects() {
        const sidebar = document.getElementById('sidebar');
        sidebar.innerHTML = `
          <h2>Subjects</h2>
          <ul class="subject-list">
            ${Object.entries(this.subjects).map(([subj, val]) => {
                const [completed, total] = this.subjectStats(subj);
                const pct = total ? (completed*100/total) : 0;
                let barClass = 'subject-progress-red';
                if (pct > 75) barClass = 'subject-progress-green';
                else if (pct > 50) barClass = 'subject-progress-yellow';
                else if (pct > 25) barClass = 'subject-progress-orange';
                return `
                  <li class="subject-item">
                    <button class="subject-btn${this.currentSubject===subj?' selected':''}" onclick="StudyTracker.selectSubject('${subj.replace(/'/g,"\\'")}')">
                      <span>${subj}</span>
                      <div class="subject-progress-bar">
                          <div class="subject-progress-inner ${barClass}" style="width:${pct}%;"></div>
                      </div>
                      <span class="subject-count">${completed}/${total}</span>
                    </button>
                  </li>
                `;
            }).join('')}
          </ul>
          <button class="reset-btn" onclick="StudyTracker.resetProgress()">Reset All Progress</button>
        `;
        this.updateOverallProgress();
    }

    renderTopics() {
        const main = document.getElementById('main-content');
        if (!this.currentSubject) { main.innerHTML = `<p>Select a subject to begin.</p>`; return; }
        const subject = this.currentSubject;
        const subjDef = this.subjects[subject];
        let out = '';
        let [completed, total] = this.subjectStats(subject);
        let pct = total ? (completed*100/total) : 0;
        let barClass = 'subject-progress-red';
        if (pct > 75) barClass = 'subject-progress-green';
        else if (pct > 50) barClass = 'subject-progress-yellow';
        else if (pct > 25) barClass = 'subject-progress-orange';
        out += `<div class="subject-stats-bar">
                  <div>${subject} Progress: <strong>${completed}</strong>/<strong>${total}</strong></div>
                  <div class="subject-progress-bar-large"><div class="subject-progress-inner-large ${barClass}" style="width:${pct}%;"></div></div>
                  <div style="margin-left:7px;" class="subject-pct-val">${pct.toFixed(1)}%</div>
                  <button class="reset-btn" onclick="StudyTracker.resetSubjectProgress()">Reset</button>
                </div>`;
        subjDef.categories.forEach((category, catIdx) => {
            out += `
              <div class="category-section">
                <div class="category-title">${category.name}</div>
                <ul class="topic-list">
                  ${category.topics.map((topic, i) => {
                      let checked = (
                          this.progress[subject]?.[catIdx]?.[i] ? 'checked' : ''
                      );
                      let completedClass = checked ? 'completed' : '';
                      return `
                       <li class="topic-item">
                         <input type="checkbox" class="topic-checkbox" id="chk-${subject}-${catIdx}-${i}" ${checked}
                             onchange="StudyTracker.toggleTopic('${subject.replace(/'/g,"\\'")}',${catIdx},${i})"
                         >
                         <span class="topic-index">${i+1}.</span>
                         <label class="topic-label ${completedClass}" for="chk-${subject}-${catIdx}-${i}">${topic}</label>
                       </li>
                      `;
                  }).join('')}
                </ul>
              </div>
            `;
        });
        main.innerHTML = out;
    }

    subjectStats(subject) {
        const subjDef = this.subjects[subject];
        let completed = 0, total = 0;
        subjDef.categories.forEach((category, catIdx) => {
            category.topics.forEach((_, i) => {
                if (this.progress[subject]?.[catIdx]?.[i]) completed++;
                total++;
            });
        });
        return [completed, total];
    }

    updateOverallProgress() {
        let completed = 0, total = 0;
        Object.keys(this.subjects).forEach(subj => {
            const [comp, tot] = this.subjectStats(subj);
            completed += comp;
            total += tot;
        });
        const pct = total ? Math.floor((completed*100)/total) : 0;
        document.getElementById('overall-completed').textContent = completed;
        document.getElementById('overall-total').textContent = total;
        document.getElementById('overall-percentage').textContent = `${pct}%`;
        document.getElementById('overall-progress-bar').style.width = `${pct}%`;
        this.saveProgress();
    }

    selectSubject(subjectName) {
        this.currentSubject = subjectName;
        this.renderSubjects();
        this.renderTopics();
    }

    toggleTopic(subject, catIdx, i) {
        if (!this.progress[subject]) this.progress[subject] = {};
        if (!this.progress[subject][catIdx]) this.progress[subject][catIdx] = {};
        this.progress[subject][catIdx][i] = !this.progress[subject][catIdx][i];
        this.saveProgress();
        this.renderSubjects();
        this.renderTopics();
    }

    resetSubjectProgress() {
        if (!this.currentSubject) return;
        delete this.progress[this.currentSubject];
        this.saveProgress();
        this.renderSubjects();
        this.renderTopics();
    }

    resetProgress() {
        if (!confirm("Are you sure you want to reset ALL progress?")) return;
        this.progress = {};
        this.saveProgress();
        this.renderSubjects();
        this.renderTopics();
    }
}

// -------
window.StudyTracker = new MedicalStudyTracker();
