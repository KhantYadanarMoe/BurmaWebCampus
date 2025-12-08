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
import { ChevronDown, Ellipsis } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import Empty from "../../../assets/Empty.png";
import { useSearch } from "@/contexts/SearchContext";

export default function CoursesCategory() {
    const [form, setForm] = useState({
        icon: "",
        name: "",
    });

    const [image, setImage] = useState(null);

    const [errors, setErrors] = useState({});

    const [refreshFlag, setRefreshFlag] = useState(false);

    const { darkMode } = useOutletContext();

    const fileInputRef = useRef(null);

    let [categories, setCategories] = useState([]);

    const [visibility, setVisibility] = useState({});

    const [currentPage, setCurrentPage] = useState(1);

    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const [editId, setEditId] = useState(null);

    const [loading, setLoading] = useState(true);

    let [categoryDetail, setCategoryDetails] = useState(null);

    const [selectedFilter, setSelectedFilter] = useState("newest");

    const { query } = useSearch();

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
                    setCategories((prevCategories) =>
                        prevCategories.map((cat) =>
                            cat.id === editId
                                ? { ...cat, ...res.data.category }
                                : cat
                        )
                    );

                    setEditDialogOpen(false);
                    setEditId(null);
                    return;
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

    let getCategories = async () => {
        setLoading(true);
        try {
            let res = await axios.get("/api/course/categories");
            let data = res.data;
            setCategories(data.categories);

            const visibilityMap = {};
            data.categories.forEach((cat) => {
                visibilityMap[cat.id] = !!+cat.is_visible;
            });

            setVisibility(visibilityMap);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, [refreshFlag]);

    const toggleVisibility = (categoryId, checked) => {
        setVisibility((prev) => ({
            ...prev,
            [categoryId]: checked,
        }));

        axios
            .put(`/api/course/category/${categoryId}/visibility`, {
                is_visible: checked,
            })
            .catch((error) => {
                console.error("Error updating visibility:", error);
            });
    };

    const rowsPerPage = 10;

    const filteredCategories = categories.filter((category) =>
        category.name?.toLowerCase().includes(query.toLowerCase())
    );

    const indexOfLastCategory = currentPage * rowsPerPage;
    const indexOfFirstCategory = indexOfLastCategory - rowsPerPage;
    const currentCategories = filteredCategories.slice(
        indexOfFirstCategory,
        indexOfLastCategory
    );

    const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

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

    const SkeletonCard = () => (
        <ul
            className={`flex items-center px-3 py-3 border-b ${
                darkMode ? "border-b-gray-600" : "border-b-gray-300"
            }`}
        >
            {/* ID */}
            <li className="basis-[5%]">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-3/4" />
            </li>

            {/* Category Name with Icon */}
            <li className="basis-[40%]">
                <div className="flex gap-2 items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-md animate-pulse" />
                    <div className="h-4 bg-gray-300 rounded-md animate-pulse w-1/2" />
                </div>
            </li>

            {/* Courses Count */}
            <li className="basis-[30%]">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-3/4" />
            </li>

            {/* Switch */}
            <li className="basis-[20%]">
                <div className="w-10 h-5 bg-gray-300 rounded-full animate-pulse" />
            </li>

            {/* Dropdown / Actions */}
            <li className="basis-[5%]">
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
            </li>
        </ul>
    );

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
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <button
                            className={`flex gap-1 items-center px-2 py-1 border ${
                                darkMode ? "border-gray-300" : "border-gray-800"
                            } rounded-md`}
                        >
                            {
                                {
                                    newest: "Filter By Newest",
                                    oldest: "Filter By Oldest",
                                    "a-z": "Filter By A-Z",
                                    "z-a": "Filter By Z-A",
                                }[selectedFilter]
                            }
                            <ChevronDown size={16} />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className="w-40"
                        avoidCollisions={false}
                    >
                        <DropdownMenuItem
                            onSelect={() => handleFilterChange("newest")}
                            className="cursor-pointer"
                        >
                            Filter By Newest
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={() => handleFilterChange("oldest")}
                            className="cursor-pointer"
                        >
                            Filter By Oldest
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={() => handleFilterChange("a-z")}
                            className="cursor-pointer"
                        >
                            Filter By A-Z
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={() => handleFilterChange("z-a")}
                            className="cursor-pointer"
                        >
                            Filter By Z-A
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="overflow-x-auto w-full">
                <div className="min-w-[920px]">
                    <ul
                        className={`flex items-center px-3 py-4 border-b ${
                            darkMode ? "border-b-gray-200" : "border-b-gray-700"
                        } my-3`}
                    >
                        <li className="basis-[5%]">ID</li>
                        <li className="basis-[40%]">Category</li>
                        <li className="basis-[30%]">Related Courses</li>
                        <li className="basis-[20%]">Visibility</li>
                        <li className="basis-[5%]"></li>
                    </ul>
                    {loading ? (
                        Array.from({ length: 10 }).map((_, idx) => (
                            <SkeletonCard key={idx} />
                        ))
                    ) : currentCategories.length > 0 ? (
                        currentCategories.map((category) => (
                            <ul
                                className={`flex items-center px-3 py-3 border-b ${
                                    darkMode
                                        ? "border-b-gray-600"
                                        : "border-b-gray-300"
                                } my-2`}
                            >
                                <li className="basis-[5%]">{category.id}</li>
                                <li className="basis-[40%]">
                                    <div className="flex gap-2 items-center">
                                        <img
                                            src={`/storage/${category.icon}`}
                                            alt=""
                                            className="w-8 h-8 object-cover rounded-md"
                                        />
                                        <span className="font-medium">
                                            {category.name}
                                        </span>
                                    </div>
                                </li>
                                <li className="basis-[30%]">
                                    {category.courses_count}
                                </li>
                                <li className="basis-[20%]">
                                    <Switch
                                        checked={
                                            visibility.hasOwnProperty(
                                                category.id
                                            )
                                                ? visibility[category.id]
                                                : false
                                        }
                                        onCheckedChange={(checked) =>
                                            toggleVisibility(
                                                category.id,
                                                checked
                                            )
                                        }
                                    />
                                </li>
                                <li className="basis-[5%]">
                                    <DropdownMenu modal={false}>
                                        <DropdownMenuTrigger asChild>
                                            <button
                                                className={`p-1 rounded-md ${
                                                    darkMode
                                                        ? "hover:bg-gray-600"
                                                        : "hover:bg-gray-100"
                                                } outline-none`}
                                            >
                                                <Ellipsis size={20} />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="w-40"
                                        >
                                            <Dialog
                                                open={editDialogOpen}
                                                onOpenChange={(isOpen) => {
                                                    setEditDialogOpen(isOpen);
                                                    if (isOpen) {
                                                        setEditId(category.id);
                                                    } else {
                                                        setEditId(null);
                                                        setErrors({});
                                                        setForm({
                                                            icon: "",
                                                            name: "",
                                                        }); // reset when dialog closes
                                                    }
                                                }}
                                            >
                                                <DialogTrigger asChild>
                                                    <Button className="text-accentYellow px-2 py-0 bg-white shadow-none hover:bg-white">
                                                        Edit
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Edit Category
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Update the category
                                                            of course below.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="flex flex-col gap-4 py-4">
                                                        <div>
                                                            <Label>
                                                                Category Icon
                                                            </Label>
                                                            <div className="flex items-center gap-1 mt-1">
                                                                <img
                                                                    src={`/storage/${category.icon}`}
                                                                    alt=""
                                                                    className="w-9 h-9 object-cover rounded-md"
                                                                />
                                                                <Input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    id="icon"
                                                                    name="icon"
                                                                    onChange={
                                                                        uploadImg
                                                                    }
                                                                    className="border-gray-400 mt-1"
                                                                />
                                                            </div>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                Upload an icon
                                                                (PNG, JPG, or
                                                                SVG)
                                                            </p>
                                                            {errors.icon && (
                                                                <p className="text-red-500 mt-1 text-sm">
                                                                    {
                                                                        errors
                                                                            .icon[0]
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <Label>
                                                                Category Name
                                                            </Label>
                                                            <Input
                                                                id="name"
                                                                name="name"
                                                                value={
                                                                    form.name
                                                                }
                                                                onChange={(e) =>
                                                                    setForm({
                                                                        ...form,
                                                                        name: e
                                                                            .target
                                                                            .value,
                                                                    })
                                                                }
                                                                className="border-gray-400 mt-1"
                                                                placeholder="Write category name"
                                                            />
                                                            {errors.name && (
                                                                <p className="text-red-500 mt-1 text-sm">
                                                                    {
                                                                        errors
                                                                            .name[0]
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button variant="secondary">
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            onClick={submit}
                                                        >
                                                            Update
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <DropdownMenuItem asChild>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <button className="text-red-600 bg-white w-full text-left px-2 py-2">
                                                            Delete
                                                        </button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Are you sure you
                                                                want to delete
                                                                this menu?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action
                                                                cannot be
                                                                undone.
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
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center p-10 border border-gray-300 rounded-lg bg-gray-50 mt-5">
                            <img
                                src={Empty}
                                alt="No blogs"
                                className="w-32 h-32 mb-4 object-contain"
                            />
                            <h2 className="text-xl font-semibold mb-2">
                                No Categories Found
                            </h2>
                            <p className="text-gray-500 text-center">
                                Sorry, there are no course categories created.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-8 flex">
                <div className="ml-auto">
                    <Pagination className="text-accentRed">
                        <PaginationContent>
                            {/* Previous Button */}
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                    className={`cursor-pointer ${
                                        currentPage === 1
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                />
                            </PaginationItem>

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        onClick={() =>
                                            handlePageChange(index + 1)
                                        }
                                        isActive={currentPage === index + 1}
                                        className="cursor-pointer"
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            {/* Next Button */}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    disabled={currentPage === totalPages}
                                    className={`cursor-pointer ${
                                        currentPage === totalPages
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}
