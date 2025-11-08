import React, { useEffect, useRef, useState } from "react";
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
import axios from "axios";

export default function CoursesCategory() {
    const [form, setForm] = useState({
        icon: "",
        name: "",
    });

    const [image, setImage] = useState(null);

    const [errors, setErrors] = useState({});

    const [refreshFlag, setRefreshFlag] = useState(false);

    const fileInputRef = useRef(null);

    let [categories, setCategories] = useState([]);

    const [visibility, setVisibility] = useState({});

    const [currentPage, setCurrentPage] = useState(1);

    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const [editId, setEditId] = useState(null);

    let [categoryDetail, setCategoryDetails] = useState(null);

    const [selectedFilter, setSelectedFilter] = useState("newest");

    const uploadImg = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const submit = async (e) => {
        e.preventDefault();

        const isEditing = editId !== null;

        // url and method to use in sending data using axios
        let url = isEditing
            ? `/api/course/category/${editId}`
            : "/api/course/category/create";
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
                res.data.message === "Course Category created successfully." ||
                res.data.message === "Course Category updated successfully."
            ) {
                setForm({ icon: null, name: "" });
                setImage(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                }
                setErrors({});
                setRefreshFlag((prev) => !prev);

                if (isEditing) {
                    setEditDialogOpen(false);
                    setEditId(null);
                }
            }
        } catch (error) {
            console.error("Error creating course category:", error);

            // failed condition
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    // let getCategories = async () => {
    //     try {
    //         let res = await axios.get("/api/course/categories");
    //         let data = res.data;
    //         setCategories(data.categories);

    //         const visibilityMap = {};
    //         data.categories.forEach((cat) => {
    //             visibilityMap[cat.id] = !!+cat.is_visible;
    //         });

    //         setVisibility(visibilityMap);
    //     } catch (error) {
    //         console.error("Failed to fetch categories:", error);
    //     }
    // };

    // useEffect(() => {
    //     getCategories();
    // }, [refreshFlag]);

    // const toggleVisibility = (categoryId, checked) => {
    //     setVisibility((prev) => ({
    //         ...prev,
    //         [categoryId]: checked,
    //     }));

    //     axios
    //         .put(`/api/course/category/${categoryId}/visibility`, {
    //             is_visible: checked,
    //         })
    //         .catch((error) => {
    //             console.error("Error updating visibility:", error);
    //         });
    // };

    const rowsPerPage = 10;

    const filteredCategories = categories.filter((category) =>
        category.category?.toLowerCase().includes(query.toLowerCase())
    );

    const indexOfLastCategory = currentPage * rowsPerPage;
    const indexOfFirstCategory = indexOfLastCategory - rowsPerPage;
    const currentCategories = filteredCategories.slice(
        indexOfFirstCategory,
        indexOfLastCategory
    );

    const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleFilterChange = (filterValue) => {
        setSelectedFilter(filterValue);

        axios
            .get(`/api/course/categories?sort=${filterValue}`)
            .then((response) => {
                const data = response.data;
                if (data.categories) {
                    setCategories(data.categories);
                }
            })
            .catch((error) => {
                console.error("Axios request failed:", error);
            });
    };

    useEffect(() => {
        handleFilterChange("newest"); // initial load
    }, []);

    let getDetails = async (id) => {
        let res = await fetch("/api/course/category/" + id);
        let data = await res.json();
        setCategoryDetails(data.category);
    };

    useEffect(() => {
        if (editId !== null) {
            getDetails(editId);
        }
    }, [editId]);

    useEffect(() => {
        if (categoryDetail) {
            setForm({
                icon: categoryDetail.icon,
                name: categoryDetail.name,
            });
        }
    }, [categoryDetail]);

    let deleteCategory = async (id) => {
        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            let res = await axios.delete("/api/course/category/" + id, {
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
            <div className="md:flex gap-2">
                <div className="mt-3 mb-1 md:w-1/2">
                    <Label>Category Icon</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        id="icon"
                        name="icon"
                        onChange={uploadImg}
                        ref={fileInputRef}
                        className="border-gray-400 mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Upload an icon (PNG, JPG, or SVG)
                    </p>
                    {errors.icon && (
                        <p className="text-red-500 mt-1 text-sm">
                            {errors.icon[0]}
                        </p>
                    )}
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
                        placeholder="Write category name"
                    />
                    {errors.name && (
                        <p className="text-red-500 mt-1 text-sm">
                            {errors.name[0]}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex justify-end mt-5 md:mt-0">
                <Button onClick={submit}>Create</Button>
            </div>
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
                        <li className="basis-[30%]">Related Courses</li>
                        <li className="basis-[20%]">Visibility</li>
                        <li className="basis-[5%]"></li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[40%]">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={Icon}
                                    alt=""
                                    className="w-8 h-8 object-cover"
                                />
                                <span className="font-medium">Frontend</span>
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
                                                        Are you sure you want to
                                                        delete this menu?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction>
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
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[40%]">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={Icon}
                                    alt=""
                                    className="w-8 h-8 object-cover"
                                />
                                <span className="font-medium">Frontend</span>
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
                                                        Are you sure you want to
                                                        delete this menu?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction>
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
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[40%]">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={Icon}
                                    alt=""
                                    className="w-8 h-8 object-cover"
                                />
                                <span className="font-medium">Frontend</span>
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
                                                        Are you sure you want to
                                                        delete this menu?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction>
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
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[40%]">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={Icon}
                                    alt=""
                                    className="w-8 h-8 object-cover"
                                />
                                <span className="font-medium">Frontend</span>
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
                                                        Are you sure you want to
                                                        delete this menu?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction>
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
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[40%]">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={Icon}
                                    alt=""
                                    className="w-8 h-8 object-cover"
                                />
                                <span className="font-medium">Frontend</span>
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
                                                        Are you sure you want to
                                                        delete this menu?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction>
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
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[40%]">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={Icon}
                                    alt=""
                                    className="w-8 h-8 object-cover"
                                />
                                <span className="font-medium">Frontend</span>
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
                                                        Are you sure you want to
                                                        delete this menu?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction>
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
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[40%]">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={Icon}
                                    alt=""
                                    className="w-8 h-8 object-cover"
                                />
                                <span className="font-medium">Frontend</span>
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
                                                        Are you sure you want to
                                                        delete this menu?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction>
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
