import React, { useState, useRef, useEffect } from "react";
import { Search, Loader2, X, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

function useDebouncedValue(value, delay) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return debounced;
}

export function SearchBar({
    placeholder = "Search…",
    initialQuery = "",
    className,
    onSearch,
    fetchSuggestions,
    debounceMs = 250,
}) {
    const [query, setQuery] = useState(initialQuery);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const inputRef = useRef(null);

    useEffect(() => {
        const onSlash = (e) => {
            const target = e.target;
            const isTyping =
                target &&
                (target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.isContentEditable);
            if (
                !isTyping &&
                (e.key === "/" ||
                    (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)))
            ) {
                e.preventDefault();
                inputRef.current?.focus();
                setOpen(true);
            }
        };
        window.addEventListener("keydown", onSlash);
        return () => window.removeEventListener("keydown", onSlash);
    }, []);

    const debouncedQuery = useDebouncedValue(query, debounceMs);

    useEffect(() => {
        let active = true;
        const load = async () => {
            if (!fetchSuggestions || !debouncedQuery.trim()) {
                setSuggestions([]);
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const res = await fetchSuggestions(debouncedQuery.trim());
                if (active) setSuggestions(res);
            } finally {
                if (active) setLoading(false);
            }
        };
        load();
        return () => {
            active = false;
        };
    }, [debouncedQuery, fetchSuggestions]);

    const submit = async () => {
        const q = query.trim();
        if (!q) return;
        setOpen(false);
        setLoading(true);
        try {
            await onSearch?.(q);
        } finally {
            setLoading(false);
        }
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            submit();
        } else if (e.key === "Escape") {
            setOpen(false);
            e.target.blur();
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <div
                className={`relative flex w-full items-center gap-2 ${
                    className || ""
                }`}
                role="search"
            >
                <div className="relative flex-1">
                    <Search
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                        size={16}
                        aria-hidden
                    />
                    <Input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setOpen(true);
                        }}
                        onKeyDown={onKeyDown}
                        placeholder={placeholder}
                        className="pl-9 pr-16"
                        aria-label="Search"
                    />
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-xs text-muted-foreground">
                        <kbd className="pointer-events-auto hidden sm:flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] uppercase">
                            <Keyboard size={12} />/
                        </kbd>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    {query && (
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Clear"
                            onClick={() => setQuery("")}
                            className="shrink-0"
                        >
                            <X size={16} />
                        </Button>
                    )}
                    <Button
                        onClick={submit}
                        disabled={loading || !query.trim()}
                        className="shrink-0"
                    >
                        {loading ? (
                            <span className="inline-flex items-center gap-2">
                                <Loader2 className="animate-spin" size={16} />
                                Searching…
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-2">
                                <Search size={16} />
                                Search
                            </span>
                        )}
                    </Button>
                </div>
            </div>

            <PopoverTrigger asChild>
                <button aria-hidden className="sr-only">
                    Open suggestions
                </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 w-[min(640px,92vw)]">
                <Command>
                    <CommandList>
                        <CommandEmpty>No suggestions</CommandEmpty>
                        <CommandGroup
                            heading={
                                query
                                    ? `Suggestions for "${query}"`
                                    : "Suggestions"
                            }
                        >
                            {suggestions.map((s, i) => (
                                <CommandItem
                                    key={`${s}-${i}`}
                                    value={s}
                                    onSelect={(val) => {
                                        setQuery(val);
                                        setOpen(false);
                                        setTimeout(() => submit(), 0);
                                    }}
                                >
                                    <Search size={14} className="mr-2" /> {s}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

async function mockFetchSuggestions(q) {
    await new Promise((r) => setTimeout(r, 300));
    const corpus = [
        "shadcn/ui",
        "shadcn command menu",
        "lucide-react icons",
        "next.js app router",
        "tailwind tips",
        "form validation",
        "dark mode",
        "radix primitives",
        "popover component",
    ];
    return corpus
        .filter((s) => s.toLowerCase().includes(q.toLowerCase()))
        .slice(0, 6);
}

export default function Searchbar() {
    const [lastQuery, setLastQuery] = useState(null);

    return (
        <div className="mx-auto max-w-3xl space-y-6 p-6">
            <h1 className="text-2xl font-semibold tracking-tight">
                Search Bar · shadcn + lucide
            </h1>
            <p className="text-sm text-muted-foreground">
                Press{" "}
                <kbd className="rounded border px-1 py-0.5 text-[10px]">/</kbd>{" "}
                to focus. Try typing to see suggestions.
            </p>

            <div className="space-y-2">
                <h2 className="text-base font-medium">With suggestions</h2>
                <SearchBar
                    placeholder="Search docs, components, or anything…"
                    fetchSuggestions={mockFetchSuggestions}
                    onSearch={(q) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                setLastQuery(q);
                                resolve();
                            }, 600);
                        })
                    }
                />
            </div>

            <div className="space-y-2">
                <h2 className="text-base font-medium">
                    Minimal (no suggestions)
                </h2>
                <SearchBar
                    placeholder="Quick search…"
                    onSearch={(q) => {
                        setLastQuery(q);
                    }}
                />
            </div>

            {lastQuery && (
                <div className="rounded-2xl border p-4 text-sm">
                    <div className="mb-1 font-medium">Last submitted query</div>
                    <div className="text-muted-foreground">{lastQuery}</div>
                </div>
            )}
        </div>
    );
}
