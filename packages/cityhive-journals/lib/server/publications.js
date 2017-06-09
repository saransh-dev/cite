import Journals, {JournalComments} from '../collection.js';

Journals.smartPublish("journals.list");
Journals.smartPublish("journals.single");

JournalComments.smartPublish("journalComments", function(){
	return JournalComments.find({});
});
