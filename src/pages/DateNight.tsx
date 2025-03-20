import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Save,
    Copy,
    Dice1,
    HelpCircle,
    Plus,
    X,
    Edit,
    Trash2,
    ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { generateDateNightIdeas, saveDateNight, getDateNights, deleteDateNight } from '@/services/api';
import { DateNightIdea } from '@/types';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const DateNight = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [dateNightIdeas, setDateNightIdeas] = useState<DateNightIdea[]>([]);
    const [isLoadingIdeas, setIsLoadingIdeas] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [dateNightIdToDelete, setDateNightIdToDelete] = useState<string | null>(null);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [isAddingNewIdea, setIsAddingNewIdea] = useState(false);
    const [newIdeaTitle, setNewIdeaTitle] = useState('');
    const [newIdeaDescription, setNewIdeaDescription] = useState('');
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const {
        data: savedDateNights,
        isLoading: isLoadingSavedDateNights,
        refetch,
    } = useQuery({
        queryKey: ['dateNights', user?.uid, selectedDate],
        queryFn: () => getDateNights(user?.uid, selectedDate),
        enabled: !!user?.uid && !!selectedDate,
    });

    const mutation = useMutation({
        mutationFn: saveDateNight
    });
    
    const deleteMutation = useMutation({
        mutationFn: deleteDateNight
    });

    useEffect(() => {
        if (savedDateNights && Array.isArray(savedDateNights) && savedDateNights.length > 0) {
            setDateNightIdeas(savedDateNights);
        } else {
            setDateNightIdeas([]);
        }
    }, [savedDateNights]);

    const handleGenerateIdeas = async () => {
        setIsLoadingIdeas(true);
        try {
            const ideas = await generateDateNightIdeas();
            setDateNightIdeas(ideas);
        } catch (error) {
            console.error("Failed to generate date night ideas:", error);
            toast.error("Failed to generate date night ideas. Please try again.");
        } finally {
            setIsLoadingIdeas(false);
        }
    };

    const handleSaveDateNight = async () => {
        if (!user) {
            toast.error("Please sign in to save date night ideas.");
            navigate('/auth?mode=login');
            return;
        }

        setIsSaving(true);
        try {
            const dateNightData = {
                userId: user.uid,
                date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
                ideas: dateNightIdeas,
            };
            await mutation.mutateAsync(dateNightData);
            toast.success("Date night ideas saved successfully!");
            await refetch();
        } catch (error) {
            console.error("Failed to save date night ideas:", error);
            toast.error("Failed to save date night ideas. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCopyIdea = (idea: DateNightIdea) => {
        navigator.clipboard.writeText(`${idea.title}\n${idea.description}`)
            .then(() => {
                toast.success("Date night idea copied to clipboard!");
            })
            .catch(err => {
                console.error("Could not copy idea: ", err);
                toast.error("Failed to copy date night idea. Please try again.");
            });
    };

    const handleEditIdea = (idea: DateNightIdea) => {
        setIsEditing(true);
        setEditedTitle(idea.title);
        setEditedDescription(idea.description);
    };

    const handleUpdateIdea = (index: number) => {
        const updatedIdeas = [...dateNightIdeas];
        updatedIdeas[index] = {
            ...updatedIdeas[index],
            title: editedTitle,
            description: editedDescription,
        };
        setDateNightIdeas(updatedIdeas);
        setIsEditing(false);
    };

    const handleDeleteConfirmation = (id: string) => {
        setDateNightIdToDelete(id);
        setIsDeleteConfirmationOpen(true);
    };

    const handleCancelDelete = () => {
        setDateNightIdToDelete(null);
        setIsDeleteConfirmationOpen(false);
    };

    const handleConfirmDelete = async () => {
        if (!user || !dateNightIdToDelete) {
            toast.error("Could not delete the date night idea.");
            return;
        }

        setIsDeleting(true);
        try {
            await deleteMutation.mutateAsync({ userId: user.uid, dateNightId: dateNightIdToDelete });
            setDateNightIdeas(dateNightIdeas.filter(idea => idea.id !== dateNightIdToDelete));
            toast.success("Date night idea deleted successfully!");
            setIsDeleteConfirmationOpen(false);
            await refetch();
        } catch (error) {
            console.error("Failed to delete date night idea:", error);
            toast.error("Failed to delete date night idea. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleAddNewIdea = () => {
        setIsAddingNewIdea(true);
    };

    const handleSaveNewIdea = () => {
        if (!newIdeaTitle || !newIdeaDescription) {
            toast.error("Please fill in both title and description for the new idea.");
            return;
        }

        const newIdea: DateNightIdea = {
            id: String(Date.now()),
            title: newIdeaTitle,
            description: newIdeaDescription,
        };

        setDateNightIdeas([...dateNightIdeas, newIdea]);
        setNewIdeaTitle('');
        setNewIdeaDescription('');
        setIsAddingNewIdea(false);
    };

    const handleCancelNewIdea = () => {
        setNewIdeaTitle('');
        setNewIdeaDescription('');
        setIsAddingNewIdea(false);
    };

    const handleHelpToggle = () => {
        setIsHelpOpen(!isHelpOpen);
    };

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date);
        setIsCalendarOpen(false);
    };

    const handleCopyAllIdeas = () => {
        const allIdeasText = dateNightIdeas.map(idea => `${idea.title}\n${idea.description}`).join('\n\n');
        navigator.clipboard.writeText(allIdeasText)
            .then(() => {
                toast.success("All date night ideas copied to clipboard!");
            })
            .catch(err => {
                console.error("Could not copy all ideas: ", err);
                toast.error("Failed to copy all date night ideas. Please try again.");
            });
    };

    const handleSaveAsImage = () => {
        const element = document.getElementById('dateNightIdeasContainer');
        if (!element) {
            toast.error("Could not save as image: container not found.");
            return;
        }

        // @ts-ignore
        import('html2canvas').then(html2canvas => {
            html2canvas.default(element, { scale: 2 })
                .then((canvas: HTMLCanvasElement) => {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = `date-night-ideas-${format(new Date(), 'yyyyMMdd')}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    toast.success("Date night ideas saved as image!");
                })
                .catch((err: Error) => {
                    console.error("Could not save as image: ", err);
                    toast.error("Failed to save date night ideas as image. Please try again.");
                });
        });
    };

    useEffect(() => {
        const copyButton = document.getElementById('copyButton');
        if (copyButton) {
            copyButton.click();
        }

        const saveButton = document.getElementById('saveButton');
        if (saveButton) {
            saveButton.click();
        }
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden glass animate-fade-in-down">
                    <div className="space-y-1 pt-2 pb-4 px-4">
                        <div className="border-t border-gray-200 my-4 pt-4 flex flex-col space-y-3">
                            <button
                                onClick={handleGenerateIdeas}
                                className="block py-2 px-3 text-base font-medium rounded-md text-foreground/70 hover:bg-primary/5 hover:text-primary"
                                disabled={isLoadingIdeas}
                            >
                                {isLoadingIdeas ? "Generating..." : "Generate Ideas"}
                            </button>
                            <button
                                onClick={handleSaveDateNight}
                                className="block py-2 px-3 text-base font-medium rounded-md text-foreground/70 hover:bg-primary/5 hover:text-primary"
                                disabled={isSaving}
                            >
                                {isSaving ? "Saving..." : "Save Date Night"}
                            </button>
                            <button
                                onClick={handleCopyAllIdeas}
                                className="block py-2 px-3 text-base font-medium rounded-md text-foreground/70 hover:bg-primary/5 hover:text-primary"
                            >
                                Copy All Ideas
                            </button>
                            <button
                                onClick={handleSaveAsImage}
                                className="block py-2 px-3 text-base font-medium rounded-md text-foreground/70 hover:bg-primary/5 hover:text-primary"
                            >
                                Save as Image
                            </button>
                            <button
                                onClick={handleAddNewIdea}
                                className="block py-2 px-3 text-base font-medium rounded-md text-foreground/70 hover:bg-primary/5 hover:text-primary"
                            >
                                Add New Idea
                            </button>
                            <button
                                onClick={handleHelpToggle}
                                className="block py-2 px-3 text-base font-medium rounded-md text-foreground/70 hover:bg-primary/5 hover:text-primary"
                            >
                                Help
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="container-tight py-16 md:py-24">
                <button onClick={() => navigate(-1)} className="inline-flex items-center mb-6 text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </button>

                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Date Night Ideas</h1>
                    <div className="space-x-4 flex items-center">
                        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[220px] justify-start text-left font-normal",
                                        !selectedDate && "text-muted-foreground"
                                    )}
                                >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="center" sideOffset={10}>
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={handleDateSelect}
                                    disabled={(date) =>
                                        date > new Date()
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <div className="md:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md p-2 text-foreground/70 hover:bg-primary/10 hover:text-primary focus:outline-none"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <span className="sr-only">Open date night menu</span>
                                {isMobileMenuOpen ? (
                                    <X className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Plus className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                        <div className="hidden md:flex space-x-2">
                            <button
                                onClick={handleGenerateIdeas}
                                className="btn-secondary flex items-center gap-2"
                                disabled={isLoadingIdeas}
                            >
                                {isLoadingIdeas ? "Generating..." : "Generate Ideas"}
                                <Dice1 className="h-4 w-4" />
                            </button>
                            <button
                                onClick={handleSaveDateNight}
                                className="btn-primary flex items-center gap-2"
                                disabled={isSaving}
                            >
                                {isSaving ? "Saving..." : "Save Date Night"}
                                <Save className="h-4 w-4" />
                            </button>
                            <button
                                id="copyButton"
                                onClick={handleCopyAllIdeas}
                                className="btn-secondary flex items-center gap-2"
                            >
                                Copy All Ideas
                                <Copy className="h-4 w-4" />
                            </button>
                            <button
                                id="saveButton"
                                onClick={handleSaveAsImage}
                                className="btn-secondary flex items-center gap-2"
                            >
                                Save as Image
                                <Save className="h-4 w-4" />
                            </button>
                            <button
                                onClick={handleAddNewIdea}
                                className="btn-secondary flex items-center gap-2"
                            >
                                Add New Idea
                                <Plus className="h-4 w-4" />
                            </button>
                            <button
                                onClick={handleHelpToggle}
                                className="btn-secondary flex items-center gap-2"
                            >
                                Help
                                <HelpCircle className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Help Modal */}
                {isHelpOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="glass rounded-2xl p-8 max-w-md relative">
                            <button
                                onClick={handleHelpToggle}
                                className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
                            >
                                <X className="h-5 w-5" />
                            </button>
                            <h2 className="text-2xl font-bold mb-4">Date Night Ideas - Help</h2>
                            <p className="mb-4">
                                This page helps you generate and manage date night ideas. Here's how to use it:
                            </p>
                            <ul className="list-disc pl-5 mb-4">
                                <li><strong>Generate Ideas:</strong> Click the "Generate Ideas" button to get a list of AI-generated date night ideas.</li>
                                <li><strong>Save Date Night:</strong> Click the "Save Date Night" button to save the current list of ideas for the selected date.</li>
                                <li><strong>Copy All Ideas:</strong> Click the "Copy All Ideas" button to copy all ideas to your clipboard.</li>
                                <li><strong>Save as Image:</strong> Click the "Save as Image" button to download the ideas as a PNG image.</li>
                                <li><strong>Add New Idea:</strong> Click the "Add New Idea" button to manually add your own date night idea.</li>
                                <li><strong>Edit Idea:</strong> Click the "Edit" icon to modify an existing idea.</li>
                                <li><strong>Delete Idea:</strong> Click the "Trash" icon to delete an idea.</li>
                                <li><strong>Select Date:</strong> Use the calendar to select a date for which you want to view or plan date nights.</li>
                            </ul>
                            <p>
                                If you have any questions or need further assistance, please contact our support team.
                            </p>
                        </div>
                    </div>
                )}

                {/* Add New Idea Modal */}
                {isAddingNewIdea && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="glass rounded-2xl p-8 max-w-md relative">
                            <button
                                onClick={handleCancelNewIdea}
                                className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
                            >
                                <X className="h-5 w-5" />
                            </button>
                            <h2 className="text-2xl font-bold mb-4">Add New Date Night Idea</h2>
                            <div className="mb-4">
                                <Label htmlFor="newTitle" className="block text-sm font-medium text-foreground">Title</Label>
                                <Input
                                    type="text"
                                    id="newTitle"
                                    className="mt-1 p-2 w-full rounded-md"
                                    value={newIdeaTitle}
                                    onChange={(e) => setNewIdeaTitle(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="newDescription" className="block text-sm font-medium text-foreground">Description</Label>
                                <textarea
                                    id="newDescription"
                                    className="mt-1 p-2 w-full rounded-md"
                                    rows={4}
                                    value={newIdeaDescription}
                                    onChange={(e) => setNewIdeaDescription(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={handleCancelNewIdea}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveNewIdea}
                                    className="btn-primary"
                                >
                                    Save Idea
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {isDeleteConfirmationOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="glass rounded-2xl p-8 max-w-md relative">
                            <button
                                onClick={handleCancelDelete}
                                className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
                            >
                                <X className="h-5 w-5" />
                            </button>
                            <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
                            <p className="mb-4">Are you sure you want to delete this date night idea?</p>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={handleCancelDelete}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className="btn-primary"
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {isLoadingSavedDateNights ? (
                    <div className="text-center">Loading saved date night ideas...</div>
                ) : (
                    <div id="dateNightIdeasContainer" className="space-y-6">
                        {dateNightIdeas.length === 0 ? (
                            <div className="text-center">No date night ideas generated or saved for this date.</div>
                        ) : (
                            dateNightIdeas.map((idea, index) => (
                                <div key={idea.id} className="glass rounded-2xl p-6 shadow-sm relative">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            {isEditing ? (
                                                <Input
                                                    type="text"
                                                    value={editedTitle}
                                                    onChange={(e) => setEditedTitle(e.target.value)}
                                                    className="text-lg font-semibold mb-1 w-full"
                                                />
                                            ) : (
                                                <h3 className="text-lg font-semibold mb-1">{idea.title}</h3>
                                            )}
                                            {isEditing ? (
                                                <textarea
                                                    value={editedDescription}
                                                    onChange={(e) => setEditedDescription(e.target.value)}
                                                    className="text-foreground/70 w-full"
                                                    rows={3}
                                                />
                                            ) : (
                                                <p className="text-foreground/70">{idea.description}</p>
                                            )}
                                        </div>
                                        <div className="flex space-x-2">
                                            {isEditing ? (
                                                <>
                                                    <button
                                                        onClick={() => handleUpdateIdea(index)}
                                                        className="p-2 rounded-full hover:bg-primary/10"
                                                    >
                                                        <ArrowRight className="h-5 w-5 text-primary" />
                                                    </button>
                                                    <button
                                                        onClick={() => setIsEditing(false)}
                                                        className="p-2 rounded-full hover:bg-gray-200"
                                                    >
                                                        <X className="h-5 w-5" />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => handleEditIdea(idea)}
                                                        className="p-2 rounded-full hover:bg-primary/10"
                                                    >
                                                        <Edit className="h-5 w-5 text-primary" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteConfirmation(idea.id)}
                                                        className="p-2 rounded-full hover:bg-red-200"
                                                    >
                                                        <Trash2 className="h-5 w-5 text-red-500" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleCopyIdea(idea)}
                                                        className="p-2 rounded-full hover:bg-primary/10"
                                                    >
                                                        <Copy className="h-5 w-5 text-primary" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default DateNight;
