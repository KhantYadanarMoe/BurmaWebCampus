import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import Icon from "../../../assets/FrontendIcon.jpg";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import { Switch } from "../ui/switch";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function BlogsCategory() {
    // prepare state to store form data
    const [form, setForm] = useState({
        icon: "",
        name: "",
    });
    const [image, setImage] = useState(null);
    const [refreshFlag, setRefreshFlag] = useState(false);
    const uploadImg = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    // store errors state
    const [errors, setErrors] = useState({});

    // state to store categories to show all of the categories data
    let [categories, setCategories] = useState([]);

    // state for pagination
    const [currentPage, setCurrentPage] = useState(1);

    // state to store detail of the category related to ID
    let [categoryDetail, setCategoryDetails] = useState(null);

    // state to store id to use in edit feature
    const [editId, setEditId] = useState(null);

    const submit = async (e) => {
        e.preventDefault();

        const isEditing = editId !== null;

        // url and method to use in sending data using axios
        let url = isEditing
            ? `/api/blog/category/${editId}`
            : "/api/blog/category/create";
        let method = "post";

        // create new object to store form data to send
        let formData = new FormData();

        // store state data in object
        if (image) {
            formData.append("icon", image); // use File object, not string
        }
        formData.append("name", form.name);

        if (isEditing) {
            formData.append("_method", "PUT");
        }

        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            // send data
            const res = await axios[method](url, formData, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
            });

            // success condition
            if (
                res.data.message === "Blog Category created successfully." ||
                res.data.message === "Blog Category updated successfully."
            ) {
                setForm({ icon: "", name: "" });
                setErrors({});
                setRefreshFlag((prev) => !prev);
                // await getCategories();

                // if (isEditing) {
                //     setEditDialogOpen(false);
                //     setEditId(null);
                // } else {
                //     setOpen(false);
                // }
            }
        } catch (error) {
            console.error("Error creating blog category:", error);

            // failed condition
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    // function to fetch all of the categories data
    let getCategories = async () => {
        try {
            let res = await axios.get("/api/blog/categories");
            let data = res.data;
            setCategories(data.categories);

            // const visibilityMap = {};
            // data.categories.forEach((cat) => {
            //     visibilityMap[cat.id] = !!+cat.visibility;
            // });

            // setVisibility(visibilityMap);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    // call data fetching function in useEffect to run when user enter the page
    useEffect(() => {
        getCategories();
    }, [refreshFlag]);

    // rows to show in a page
    // const rowsPerPage = 10;

    // const filteredCategories = categories.filter((category) =>
    //     category.category?.toLowerCase().includes(query.toLowerCase())
    // );

    // // calculate the last items, first items and set menus to show
    // const indexOfLastCategory = currentPage * rowsPerPage;
    // const indexOfFirstCategory = indexOfLastCategory - rowsPerPage;
    // const currentCategories = filteredCategories.slice(
    //     indexOfFirstCategory,
    //     indexOfLastCategory
    // );

    // const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);

    // const handlePageChange = (page) => {
    //     if (page >= 1 && page <= totalPages) {
    //         setCurrentPage(page);
    //     }
    // };

    // // setting format for created_at date
    // dayjs.extend(relativeTime);

    // // fetch data to show prev data in input fields
    // let getDetails = async (id) => {
    //     let res = await fetch("/api/category/" + id);
    //     let data = await res.json();
    //     setCategoryDetails(data.category);
    // };

    // // call data fetching function depend on id changes
    // useEffect(() => {
    //     if (editId !== null) {
    //         getDetails(editId);
    //     }
    // }, [editId]);

    // // add prev data sent from backend in the form state
    // useEffect(() => {
    //     if (categoryDetail) {
    //         setForm({
    //             category: categoryDetail.category,
    //         });
    //     }
    // }, [categoryDetail]);

    // const [visibility, setVisibility] = useState({});

    // const toggleVisibility = (categoryId, checked) => {
    //     setVisibility((prev) => ({
    //         ...prev,
    //         [categoryId]: checked,
    //     }));

    //     axios
    //         .put(`/api/category/${categoryId}/visibility`, {
    //             visibility: checked,
    //         })
    //         .catch((error) => {
    //             console.error("Error updating visibility:", error);
    //         });
    // };

    // delete function
    let deleteCategory = async (id) => {
        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            let res = await axios.delete("/api/blog/category/" + id, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
            });

            setCategories((prev) =>
                prev.filter((category) => category.id !== id)
            );
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div>
            <h1 className="text-lg font-medium">Add new category</h1>
            <form action="">
                <div className="md:flex gap-2">
                    <div className="mt-3 mb-1 md:w-1/2">
                        <Label>Category Icon</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            id="icon"
                            name="icon"
                            onChange={uploadImg}
                            className="border-gray-400 mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Upload an icon (PNG, JPG, or SVG)
                        </p>
                    </div>
                    <div className="mt-3 mb-1 md:w-1/2">
                        <Label>Category Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                            className="border-gray-400 mt-1"
                            placeholder="Write the title of this blog"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-5 md:mt-0">
                    <Button onClick={submit}>Create</Button>
                </div>
            </form>
            <hr className="my-5 border-t-gray-400" />
            <div className="flex justify-between my-5">
                <h1 className="text-lg font-medium">Category</h1>
                <Select>
                    <SelectTrigger className="w-[180px] border-gray-700">
                        <SelectValue placeholder="Filter " />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Filter By Newest</SelectItem>
                        <SelectItem value="oldest">Filter By Oldest</SelectItem>
                        <SelectItem value="a-z">Filter By A-Z</SelectItem>
                        <SelectItem value="z-a">Filter By Z-A</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="overflow-x-auto w-full">
                <div className="min-w-[920px]">
                    <ul className="flex items-center px-3 py-4 border-b border-b-gray-700 my-3">
                        <li className="basis-[5%]">ID</li>
                        <li className="basis-[40%]">Category</li>
                        <li className="basis-[30%]">Related Blogs</li>
                        <li className="basis-[20%]">Visibility</li>
                        <li className="basis-[5%]"></li>
                    </ul>
                    {categories.map((category) => (
                        <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                            <li className="basis-[5%]">{category.id}</li>
                            <li className="basis-[40%]">
                                <div className="flex gap-2 items-center">
                                    <img
                                        src={`/storage/${category.icon}`}
                                        alt=""
                                        className="w-8 h-8 object-cover rounded-lg"
                                    />
                                    <span className="font-medium">
                                        {category.name}
                                    </span>
                                </div>
                            </li>
                            <li className="basis-[30%]">27</li>
                            <li className="basis-[20%]">
                                <Switch />
                            </li>
                            <li className="basis-[5%]">
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                            <Ellipsis size={20} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <DropdownMenuItem className="text-accentYellow">
                                            <Link to="">Edit</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button className="text-accentRed bg-white w-full text-left px-2 py-2">
                                                        Delete
                                                    </button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Are you sure you
                                                            want to delete this
                                                            menu?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot
                                                            be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                deleteCategory(
                                                                    category.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
            <div className="mt-8 flex">
                <div className="ml-auto">
                    <Pagination className="text-accentRed">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink>1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink>2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink>3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}
