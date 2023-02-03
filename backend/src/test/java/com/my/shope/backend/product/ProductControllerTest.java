package com.my.shope.backend.product;

import com.my.shope.backend.TestData;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ProductControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
        void create_whenNotLoggedIn_returnUnauthorized() throws Exception {
        this.mvc.perform(multipart(HttpMethod.POST,"/api/products")
                .file(TestData.PRODUCT_FILE_1)
        ).andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "muslim",password = "passowrd", roles = {"ADMIN"})
    void create_product_Without_photos_when_only_txtFile_sanded() throws Exception {
        this.mvc.perform(multipart(HttpMethod.POST,"/api/products")
                        .file(TestData.PRODUCT_FILE_1))
                .andExpect(status().isOk());
    }
    @Test
    @WithMockUser(username = "muslim",password = "passowrd", roles = {"BASIC"})
    void create_product_should_returnUnauthorized_for_BASIC() throws Exception {
        this.mvc.perform(multipart(HttpMethod.POST,"/api/products")
                        .file(TestData.PRODUCT_FILE_1)
                )
                .andExpect(status().isForbidden());
    }



    @Test
    @WithMockUser(username = "user", password = "pw",roles = "ADMIN")
    void getAll_should_return_all_products() throws Exception {
            // given
        this.mvc.perform(multipart(HttpMethod.POST,"/api/products")
                .file(TestData.PRODUCT_FILE_2)
        );

        //when and then
        mvc.perform(multipart(HttpMethod.GET,"/api/products")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpectAll(
                        status().isOk()).andExpect(content().json(TestData.PRODUCT_EXPECTED_2_ARRAY));
    }
    @Test
    @WithMockUser(username = "admin",password = "ps",roles = "ADMIN")
    void delete_product_then_return_minus_the_deleted_product() throws Exception {
        // given
        mvc.perform(post("/api/app-users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestData.NEW_USER_ADMIN)).andExpect( MockMvcResultMatchers.status().isOk()
        );

        this.mvc.perform(multipart(HttpMethod.POST,"/api/products")
                .file(TestData.PRODUCT_FILE_1)
        );

        String expected = """
                []
               """;
        //when and then
        mvc.perform(delete("/api/products/"+"1"))
                .andExpectAll(
                        status().isOk()).andExpect(content().json(expected));
        }

    @Test
    @WithMockUser(username = "user", password = "pw",roles = "ADMIN")
    void getProductById_should_return_product() throws Exception {
        // given
        this.mvc.perform(post("/api/app-users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestData.NEW_USER_ADMIN)).andExpect( MockMvcResultMatchers.status().isOk()
        );

        this.mvc.perform(multipart(HttpMethod.POST,"/api/products")
                .file(TestData.PRODUCT_FILE_1)
        ).andExpect(status().isOk());

        //when and then
        mvc.perform(multipart(HttpMethod.GET,"/api/products/"+"1")).andExpectAll(
                               status().isOk()).andExpect(content().json(TestData.PRODUCT_EXPECTED_1,false));
    }

    @Test
    @WithMockUser(username = "user", password = "pw",roles = "ADMIN")
    void getProductsByName_should_return_products_with_the_this_specific_name() throws Exception {
        // given
        this.mvc.perform(post("/api/app-users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestData.NEW_USER_ADMIN)).andExpect( MockMvcResultMatchers.status().isOk()
        );

        this.mvc.perform(multipart(HttpMethod.POST,"/api/products")
                .file(TestData.PRODUCT_FILE_1)
        ).andExpect(status().isOk());

        this.mvc.perform(multipart(HttpMethod.POST,"/api/products")
                .file(TestData.PRODUCT_FILE_2)
        ).andExpect(status().isOk());



        //when and then
        mvc.perform(multipart(HttpMethod.GET,"/api/products/search-by-name/"+"product2")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpectAll(
                            status().isOk()).andExpect(content().json(TestData.PRODUCT_EXPECTED_2_ARRAY));
    }

    @Test
    @WithMockUser(username = "user", password = "pw",roles = "ADMIN")
    void getProductsByName_should_return_empty() throws Exception {
        // given
        this.mvc.perform(multipart(HttpMethod.POST,"/api/products")
                .file(TestData.PRODUCT_FILE_1)
        ).andExpect(status().isOk());

        String expected = """
                []
                """;
        //when and then
        mvc.perform(multipart(HttpMethod.GET,"/api/products/search-by-name/"+"empty")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpectAll(
                            status().isOk()).andExpect(content().json(expected));
    }

    @Test
    @WithMockUser(username = "user", password = "pw",roles = "ADMIN")
    void when_only_txtFile_uploaded_then_does_not_sett_the_photos() throws Exception {
        // given
        this.mvc.perform(multipart(HttpMethod.POST,"/api/products")
                .file(TestData.PRODUCT_FILE_2)
        ).andExpect(status().isOk()) .andExpect(status().isOk()).andExpect(content().json(TestData.PRODUCT_EXPECTED_2));
        // when and actual

    }
}