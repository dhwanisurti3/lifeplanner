import { createStore } from "vuex";
import { isToday, isYesterday, format, isValid } from "date-fns";

export default createStore({
    state: {
        sections: [],
        selectedSectionId: null,
        currentItem: null,
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
        UPDATE_SECTIONS_ORDER(state, { fromIndex, toIndex }) {
            const section = state.sections.splice(fromIndex, 1)[0];
            state.sections.splice(toIndex, 0, section);
            localStorage.setItem('sections', JSON.stringify(state.sections));

          },
          
    },  
    actions: {
        async fetchSections({ commit }) {
            try {
                const response = await fetch("http://localhost:3000/sections");
                const data = await response.json();
                commit("SET_SECTIONS", data);
            } catch (error) {
                console.error("Failed to fetch sections:", error);
            }
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
                section.items = section.items.filter((item) => item.id !== itemId);
                try {
                    await fetch(`http://localhost:3000/sections/${sectionId}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ items: section.items }),
                    });
                    commit("REMOVE_ITEM_FROM_SECTION", { sectionId, itemId });
                    await this.dispatch("saveSectionsToServer"); // Save after removing
                } catch (error) {
                    console.error("Failed to remove item:", error);
                }
            }
        },        
        selectSection({ commit, state }, sectionId) {

        // Check if the item with the given sectionId exists in the state
        const itemExists = state.sections.find(section => section.id === sectionId);
        console.log("itemExists",itemExists);

        if (itemExists) {
        console.log("Item found:", itemExists);
        commit("SET_SELECTED_SECTION", sectionId);
        } else {
        console.log("Item not found for Section ID:", sectionId);
        }
        },
        async saveSectionsToServer({ state }) {
            try {
                for (const section of state.sections) {
                    await fetch(`http://localhost:3000/sections/${section.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(section),
                    });
                }
                console.log("Sections successfully saved to the server");
            } catch (error) {
                console.error("Failed to save sections:", error);
            }
        },
        async updateSectionsOrder({ commit, state }, { fromIndex, toIndex }) {
            commit('UPDATE_SECTIONS_ORDER', { fromIndex, toIndex });
            try {
                const updatedSections = state.sections.map((section, index) => ({
                    ...section,
                    order: index, // If you have an 'order' property, update it here
                }));

                await Promise.all(
                    updatedSections.map((section) =>
                        fetch(`http://localhost:3000/sections/${section.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(section),
                        })
                    )
                );

                console.log('Sections order successfully updated on the server');
            } catch (error) {
                console.error('Failed to update sections order on the server:', error);
            }
        }
    },
});
