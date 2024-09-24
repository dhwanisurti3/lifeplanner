import { createStore } from "vuex";
import { isToday, isYesterday, format } from "date-fns";

export default createStore({
    state: {
        sections: [],
        selectedSectionId: null,
    },
    getters: {
        // sections(state) {
        //     return state.sections;
        // },
        sections(state) {
            const sectionsByDate = {};

            state.sections.forEach((section) => {
                const sectionDate = new Date(section.createdDate);

                let displayDate;
                if (isToday(sectionDate)) {
                    displayDate = "Today";
                } else if (isYesterday(sectionDate)) {
                    displayDate = "Yesterday";
                } else {
                    displayDate = format(sectionDate, "MMMM dd, yyyy");
                }

                if (!sectionsByDate[displayDate]) {
                    sectionsByDate[displayDate] = [];
                }
                sectionsByDate[displayDate].push(section);
            });

            return sectionsByDate;
        },
    },
    mutations: {
        SET_SECTIONS(state, sections) {
            state.sections = sections;
        },
        ADD_SECTION(state, section) {
            state.sections.push(section);
        },
        REMOVE_SECTION(state, sectionId) {
            state.sections = state.sections.filter(
                (section) => section.id !== sectionId
            );
        },
        SET_SELECTED_SECTION(state, sectionId) {
            state.selectedSectionId = sectionId;
        },
    },
    actions: {
        fetchSections({ commit }) {
            // const localSections = localStorage.getItem("sections");

            // if (localSections) {
            //     // If sections exist in localStorage, use them
            //     commit("SET_SECTIONS", JSON.parse(localSections));
            // } else {
            //     // Fetch from db.json if nothing is in localStorage
            //     fetch("/db.json")
            //         .then((response) => response.json())
            //         .then((data) => {
            //             commit("SET_SECTIONS", data.sections);
            //             localStorage.setItem(
            //                 "sections",
            //                 JSON.stringify(data.sections)
            //             ); // Save to localStorage
            //         })
            //         .catch((error) =>
            //             console.error("Failed to fetch sections:", error)
            //         );
            // }

            const localSections = localStorage.getItem("sections");

            if (localSections) {
                commit("SET_SECTIONS", JSON.parse(localSections));
            } else {
                fetch("/db.json")
                    .then((response) => response.json())
                    .then((data) => {
                        commit("SET_SECTIONS", data.sections);
                        localStorage.setItem(
                            "sections",
                            JSON.stringify(data.sections)
                        );
                    })
                    .catch((error) =>
                        console.error("Failed to fetch sections:", error)
                    );
            }
        },
        addSection({ commit, state }, newSection) {
            commit("ADD_SECTION", newSection);
            // Save updated sections to localStorage
            localStorage.setItem("sections", JSON.stringify(state.sections));
        },
        removeSection({ commit, state }, sectionId) {
            commit("REMOVE_SECTION", sectionId);
            // Save updated sections to localStorage
            localStorage.setItem("sections", JSON.stringify(state.sections));
        },

        selectSection({ commit }, sectionId) {
            commit("SET_SELECTED_SECTION", sectionId);
        },
    },
});
