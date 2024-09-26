import { createStore } from "vuex";
import { isToday, isYesterday, format, isValid } from "date-fns";

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
                // Validate and parse the createdDate
                const sectionDate = new Date(section.createdDate);

                // Check if the date is valid
                if (!isValid(sectionDate)) {
                    console.warn(
                        `Invalid date for section ID ${section.id}: ${section.createdDate}`
                    );

                    return; // Skip this section if the date is invalid
                }

                let displayDate;
                if (isToday(sectionDate)) {
                    displayDate = "Today";
                } else if (isYesterday(sectionDate)) {
                    displayDate = "Yesterday";
                }
                //  {
                //     displayDate = format(sectionDate, "MMMM dd, yyyy");
                // }

                if (!sectionsByDate[displayDate]) {
                    sectionsByDate[displayDate] = [];
                }
                sectionsByDate[displayDate].push(section);
            });

            return sectionsByDate;
        },
    },
    mutations: {
        // ADD_ITEM_TO_SECTION(state, { sectionId, newItem }) {
        //     const section = state.sections.find((s) => s.id === sectionId);
        //     if (section) {
        //         section.items.push(newItem);
        //     }
        // },
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
        ADD_ITEM_TO_SECTION(state, { sectionId, newItem }) {
            const section = state.sections.find((s) => s.id === sectionId);
            if (section) {
                section.items.push(newItem);
            }
        },
        REMOVE_ITEM_FROM_SECTION(state, { sectionId, itemId }) {
            const section = state.sections.find((s) => s.id === sectionId);
            if (section) {
                section.items = section.items.filter(
                    (item) => item.id !== itemId
                );
            }
        },
    },
    actions: {
        // async addItemToSection({ commit }, { sectionId, newItem }) {
        //     // Here you can also perform any async operation if needed
        //     commit("ADD_ITEM_TO_SECTION", { sectionId, newItem });
        // },
        async fetchSections({ commit }) {
            try {
                const response = await fetch("http://localhost:3000/sections");
                const data = await response.json();
                commit("SET_SECTIONS", data);
            } catch (error) {
                console.error("Failed to fetch sections:", error);
            }

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

            // const localSections = localStorage.getItem("sections");

            // if (localSections) {
            //     commit("SET_SECTIONS", JSON.parse(localSections));
            // } else {
            //     fetch("/db.json")
            //         .then((response) => response.json())
            //         .then((data) => {
            //             commit("SET_SECTIONS", data.sections);
            //             localStorage.setItem(
            //                 "sections",
            //                 JSON.stringify(data.sections)
            //             );
            //         })
            //         .catch((error) =>
            //             console.error("Failed to fetch sections:", error)
            //         );
            // }
        },
        async addSection({ commit }, newSection) {
            try {
                const response = await fetch("http://localhost:3000/sections", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newSection),
                });
                const data = await response.json();
                commit("ADD_SECTION", data);
            } catch (error) {
                console.error("Failed to add section:", error);
            }
        },
        async removeSection({ commit }, sectionId) {
            try {
                await fetch(`http://localhost:3000/sections/${sectionId}`, {
                    method: "DELETE",
                });

                commit("REMOVE_SECTION", sectionId);
            } catch (error) {
                console.error("Failed to remove section:", error);
            }
        },
        async addItemToSection({ commit, state }, { sectionId, newItem }) {
            const section = state.sections.find((s) => s.id === sectionId);
            if (section) {
                try {
                    section.items.push(newItem);

                    await fetch(`http://localhost:3000/sections/${sectionId}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ items: section.items }),
                    });
                    commit("ADD_ITEM_TO_SECTION", { sectionId, newItem });
                } catch (error) {
                    console.error("Failed to add item:", error);
                }
            }
        },
        async removeItemFromSection({ commit, state }, { sectionId, itemId }) {
            const section = state.sections.find((s) => s.id === sectionId);
            if (section) {
                section.items = section.items.filter(
                    (item) => item.id !== itemId
                );

                try {
                    await fetch(`http://localhost:3000/sections/${sectionId}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ items: section.items }),
                    });

                    commit("SET_SECTIONS", state.sections);
                } catch (error) {
                    console.error("Failed to remove item:", error);
                }
            }
        },
        selectSection({ commit }, sectionId) {
            commit("SET_SELECTED_SECTION", sectionId);
        },
    },
});
