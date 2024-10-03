import { shallowMount } from "@vue/test-utils";
import BookList from "@/components/BookList.vue";

describe("BookList.vue", () => {
  it("renders book list", () => {
    const wrapper = shallowMount(BookList);
    expect(wrapper.findAll(".book-item").length).toBe(0);
  });

  it("filters books based on search query", async () => {
    const wrapper = shallowMount(BookList);
    wrapper.setData({
      books: [
        { title: "Test Book", synopsis: "Test Synopsis", cover: "", rating: "10" }
      ],
      searchQuery: "Test"
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll(".book-item").length).toBe(1);
  });
});
